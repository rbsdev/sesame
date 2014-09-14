import bluetooth
import logging

class DeviceScanner(object):

    def start(self, callback):
        # scan events
        # for each event get mac address
        logging.info("Scanning devices...")
        mac_address = 'abc'
        callback(mac_address)
        

