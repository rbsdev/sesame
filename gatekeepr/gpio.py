import RPi.GPIO as GPIO
from time import sleep

channel = 17

GPIO.setmode(GPIO.BCM)
GPIO.setup(channel, GPIO.OUT)
GPIO.output(channel, GPIO.HIGH)

sleep(1)

GPIO.cleanup()
