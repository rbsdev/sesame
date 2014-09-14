#!/usr/bin/env python

from gatekeepr import GatekeeprClient 
from scanner import DeviceScanner
import logging


def main():
    gatekeepr_client = GatekeeprClient('http://10.1.24.100')
    device_scanner = DeviceScanner()  
    device_scanner.start(gatekeepr_client.open)


if __name__ == '__main__':
    logging.getLogger().setLevel(logging.INFO)
    main()
