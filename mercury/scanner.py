import bluetooth
import logging
import dbus
import time
from pprint import pprint

bus = dbus.SystemBus()
manager = dbus.Interface(bus.get_object("org.bluez", "/"), "org.bluez.Manager")
adapter_path = manager.DefaultAdapter()
adapter = dbus.Interface(bus.get_object("org.bluez", adapter_path),
                                                        "org.bluez.Adapter")

blacklisted = [
	"5E:0F:00:00:FF:02",
	"30:30:10:02:1A:8B",
	"00:00:60:00:00:05",
	"00:42:03:01:F4:03",
	"5E:C4:2F:47:66:BC",
	"20:00:09:1A:18:32",
	"FA:60:28:14:08:2B"
]

class DeviceScanner(object):

    def start(self, callback):
        while True:
            time.sleep(1)
            for path in adapter.ListDevices():
                    device = dbus.Interface(bus.get_object("org.bluez", path),
                                                            "org.bluez.Device")
                    properties = device.GetProperties()
                    if properties["Address"] not in blacklisted:
                    	callback(properties['Address'])
                        path = adapter.FindDevice(properties['Address'])
                        adapter.RemoveDevice(path)

if __name__ == "__main__":
    d = DeviceScanner()
    d.start(callback = pprint)
