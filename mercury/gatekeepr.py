import requests
import logging


class GatekeeprClient(object):

    def __init__(self, url='http://localhost'):
        self._url = url


    def open(self, mac_address):
        logging.info("Sending /open to " + self._url)
        response = requests.post(
            self._url + "/open", 
            params={"mac_address": mac_address},
        )
        if response.status_code != 200:
            logging.error("Gatekeepr returned code {0}".format(response.status_code))


