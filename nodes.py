import RPi.GPIO as GPIO
from lib_nrf24 import NRF24
import time
import spidev

GPIO.setmode(GPIO.BCM)
nodes = [[0x01, 0x01, 0x01, 0x01, 0xE0],[0x01, 0x01, 0x01, 0x01, 0xE1]]

radio = NRF24(GPIO, spidev.SpiDev())
radio.begin(0, 17)
radio.setPayloadSize(32)
radio.setChannel(0x60)

radio.setDataRate(NRF24.BR_1MBPS)
radio.setPALevel(NRF24.PA_MIN)

radio.openReadingPipe(1, nodes[0])
radio.openWritingPipe(nodes[1])

radio.startListening()

if radio.available():
    message = []
    radio.read(message, radio.getDynamicPayloadSize())
    print (message)







