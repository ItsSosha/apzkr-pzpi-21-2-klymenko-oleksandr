from constants import CLEAR_TERMINAL
from http_service import HttpService
from utils import get_number

class AuthService:
    def __init__(self):
        self.http_service = HttpService()

    
    def start(self):
        CLEAR_TERMINAL()

        print("Choose an option:\n")
        print("0 - Go back")
        print("1 - Sign in")
        choice = get_number("> ")

        if choice == 0:
            return
        elif choice == 1:
            self.sign_in()
        else:
            self.start()


    def sign_in(self):
        email = input("Email: ")
        password = input("Password: ")
        
        if email and password:
            authenticated = self.http_service.sign_in(email, password)
            if authenticated:
                print(f"Welcome, {email}!")
                return

        print("Invalid credentials, please try again.")
        self.sign_in()


        
