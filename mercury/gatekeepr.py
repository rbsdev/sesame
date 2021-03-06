import requests
import logging
import json


class GatekeeprClient(object):

    def __init__(self, url='http://localhost'):
        self._url = url


    def open(self, mac_address):
        logging.info("Sending /open with address {} to {}".format(mac_address, self._url))
        try:
            response = requests.post(
                self._url + "/open", 
                data=json.dumps({"mac_address": mac_address}),
		headers={"Content-Type":"application/json"}
            )
    
            if response.status_code != 200:
                logging.error("Gatekeepr returned code {0}".format(response.status_code))
            else:
                logging.info("Gatekeepr returned " + response.text)
        except Exception, e:
            logging.error("Request error: %s" % e)


