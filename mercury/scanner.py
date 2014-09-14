import bluetooth
import logging

class DeviceScanner(object):

    def start(self, callback):
        while True:
            logging.info("\n\nScanning devices...")
            nearby_devices = bluetooth.discover_devices(lookup_names = True)
            logging.info("found %d devices" % len(nearby_devices))

            for addr, name in nearby_devices:
                logging.info("Found device: %s - %s" % (addr, name))
                callback(addr)
        

