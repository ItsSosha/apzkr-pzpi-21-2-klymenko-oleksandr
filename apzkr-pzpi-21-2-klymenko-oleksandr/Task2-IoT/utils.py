import utime

def get_number(prompt = ""):
    number = -1
    while number == -1:
        try:
            number = int(input(prompt))
        except:
            print("Please enter a valid number.")
    return number


def get_iso_date():
    timestamp = utime.time()
    year, month, day, hour, minute, second, weekday, yearday = utime.localtime(timestamp)
    return "{:04d}-{:02d}-{:02d}T{:02d}:{:02d}:{:02d}".format(year, month, day, hour, minute, second)