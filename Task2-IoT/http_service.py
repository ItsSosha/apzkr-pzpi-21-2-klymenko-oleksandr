import constants
import urequests
from utils import get_iso_date

class HttpService:
    def sign_in(self, email, password):
        url = f"{constants.FIREBASE_LOGIN_ENDPOINT}?key={constants.FIREBASE_API_KEY}"
        payload = {
            "email": email,
            "password": password,
            "returnSecureToken": True
        }
        headers = {
            "Content-Type": "application/json",
        }

        response = urequests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            constants.FIREBASE_ID_TOKEN = response.json()['idToken']
            return True
        else:
            return False

    
    def send_measurement(self, heartRate, temperature):
        url = f"{constants.API_BASE_URL}/trainings/measure"
        payload = {
            "heartRate": heartRate,
            "temperature": temperature,
            "date": get_iso_date()
        }
        headers = {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": f"Bearer {constants.FIREBASE_ID_TOKEN}",
        }

        response = urequests.post(url, json=payload, headers=headers)
        return response.status_code == 201

    
    def start_training(self):
        url = f"{constants.API_BASE_URL}/trainings/start"
        headers = {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": f"Bearer {constants.FIREBASE_ID_TOKEN}",
        }
        response = urequests.post(url, headers=headers)
        responseJson = response.json()
        if response.status_code == 200 and response_json:
            constants.ACTIVE_TRAINING_ID = responseJson['id']
            return True
        else:
            return False