import time

API_BASE_URL = ""
ACTIVE_TRAINING_ID = ""

LOGGING_INTERVAL=15

MAX_NORMAL_HEARTBEAT=130

NETWORK_NAME = "Wokwi-GUEST"
NETWORK_PASSWORD = ""

FIREBASE_ID_TOKEN = ""
FIREBASE_LOGIN_ENDPOINT = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword"
FIREBASE_API_KEY = ""

CLEAR_TERMINAL = lambda: print("\033[H\033[J", end="")
SLEEP = lambda n = 1: time.sleep(n)