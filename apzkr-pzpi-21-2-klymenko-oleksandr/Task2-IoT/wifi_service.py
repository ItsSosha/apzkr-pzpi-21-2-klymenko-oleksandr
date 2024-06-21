import network
import time
from constants import CLEAR_TERMINAL

class WifiService:
    def __init__(self):
        self.wlan = network.WLAN(network.STA_IF)

    def connect_to_wifi(self):
        CLEAR_TERMINAL()
        name = input("Network name: ")
        password = input("Network password: ")
        print("Connecting to WiFi", end="")
        self.wlan.active(True)
        self.wlan.connect(name, password)
        while not self.wlan.isconnected():
            print(".", end="")
            time.sleep(0.1)
        print("Connected!")