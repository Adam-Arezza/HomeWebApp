#Script to open communications for all NRF24L01 devices
#All device settings wil be configured here

import RPi.GPIO as GPIO
from lib_nrf24 import NRF24
import time
import spidev

GPIO.setmode(GPIO.BCM)
#first node is for blinds Reading
#second node is for blinds Writing
#third node is for...
nodes = [[0x01, 0x01, 0x01, 0x01, 0xE0],[0x01, 0x01, 0x01, 0x01, 0xE1]]

radio = NRF24(GPIO, spidev.SpiDev())
radio.begin(0, 17)
#radio.setPayloadSize(32)
#setting communications channel
radio.setChannel(0x60)

#Setting data rate
#Setting power level of signal
#allowing Dynamic payloads
#open a reading pipe to read from the blinds node
#open a writing pipe to write to the blinds node
radio.setDataRate(NRF24.BR_1MBPS)
radio.setPALevel(NRF24.PA_MIN)
radio.enableDynamicPayloads()
radio.openReadingPipe(1, nodes[0])
radio.openWritingPipe(nodes[1])

#initialized as reader, listening on pipe
radio.startListening()

command = ''
message = []

#while True:
if radio.available:
        #While the script is running, the message from the ndoe is read
        #The incoming message is stored in "message"	
        radio.read(message, radio.getDynamicPayloadSize())
        #print (message)

if command:
        radio.write(command)





