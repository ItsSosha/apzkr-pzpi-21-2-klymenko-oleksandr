from auth_service import AuthService
from wifi_service import WifiService
from http_service import HttpService
from utils import get_number
from machine import Pin
import dht
import constants

import time

class AppService:
    def __init__(self):
        self.auth_service = AuthService()
        self.wifi_service = WifiService()
        self.http_service = HttpService()
        self.sensor = dht.DHT22(Pin(15))
        self.led = Pin(18, Pin.OUT)
        self.warning = False

    
    def ledOn(self):
        self.led.value(1)
        self.warning = True

    def ledOff(self):
        self.led.value(0)
        self.warning = False


    def main(self):
        self.wifi_service.connect_to_wifi()
        constants.SLEEP()
        constants.CLEAR_TERMINAL()
        self.start()

    
    def start(self):
        constants.CLEAR_TERMINAL()
        print("Choose an option:\n")
        print("1 - Sign in")
        print("2 - Start training")
        print("3 - Change api base url")
        option = -1
        while option == -1:
            try:
                option = get_number("> ")
            except:
                print("Please enter a valid number.")
        if option == 1:
            self.auth()
        elif option == 2:
            self.start_training()
        elif option == 3:
            self.change_base_url()
        constants.SLEEP()
        self.start()

    
    def auth(self):
        self.auth_service.start()
        constants.SLEEP()

    def measure_and_check_for_end(self):
        self.sensor.measure()
        temperature = self.sensor.temperature()
        heartRate = round(self.sensor.humidity() + 40)
        trainingActive = self.http_service.send_measurement(heartRate, temperature)
        if heartRate >= constants.MAX_NORMAL_HEARTBEAT:
            self.ledOn()
        else:
            self.ledOff()
        if trainingActive:
            print(f"Logged heart rate: {heartRate}; temperature: {temperature}")
            constants.SLEEP(constants.LOGGING_INTERVAL)
        return trainingActive


    def start_training(self):
        constants.CLEAR_TERMINAL()
        if not constants.FIREBASE_ID_TOKEN:
            print("You must be authenticated to start training.")
            return
        self.http_service.start_training()
        shouldMeasure = True
        while shouldMeasure:
            shouldMeasure = self.measure_and_check_for_end()
        print("We hope you had a great training!")
        constants.SLEEP(3)


    def change_base_url(self):
        constants.CLEAR_TERMINAL()
        newUrl = input("Enter a new api base url: ")
        if newUrl:
            constants.API_BASE_URL = newUrl
            print(f"Successfully changed api base url to {newUrl}.")
        else:
            print("Invalid url, please try again.")

        
        
        
        

        
        