Using the Raspberry Pi to control an LED may appear to be a simple or tedious operation. The same hardware and programming techniques used to drive an LED, however, may also be used to control a broad range of sensors and modules. One of the introductory circuits that helps one become acquainted with the GPIO pins of the Raspberry Pi is led flashing. In this case , we use Python to construct code that blinks an LED every two seconds.
Components used in this experiment are –

- Raspberry Pi

- One LED – any color

- One Ohm resistor - Any value between 330
  Ohm to 1 k Ohm can be used.

- Connecting wires – Male to Female wires

- One Mini Breadboard

First and foremost, ensure that your Raspberry Pi is turned off. This is quite crucial. Never connect or disconnect any hardware component while your Pi is switched on. You might harm it, for example, with an ESD (Electro Static Discharge), or perhaps entirely destroy it, if you connect the incorrect pins.

RASPBERRY PI - Raspberry Pi is a pocket-sized computer with GPIO ports for connecting to various sensors and peripherals, making it an excellent platform for embedded developers. It is a board with an ARM architecture CPU developed for electronic engineers and enthusiasts. The PI is currently one of the most trustworthy project development platforms available. The Raspberry Pi, with its faster CPU and more RAM, may be utilized for a variety of high-profile projects such as image processing and Internet of Things. The high-end Raspberry Pi 4 with 8GB RAM is now available.
The Raspberry Pi features a strong capability known as General Purpose Input/Output (GPIO) Pins. GPIO Pins serve as the physical interface between the outside world and the Raspberry Pi. Through these GPIO Pins, various external components like as LEDs, Motors, Sensors, Displays, and so on are linked to the Raspberry Pi. In this Experiment, we will use the Raspberry Pi to blink an LED, therefore understanding all of the GPIO Pins is essential.
40 GPIO Pins are available on the Raspberry Pi 3 Model B. Few of the 40 GPIO pins are power pins, such as 3.3V Pins (2), 5V Pins (2), and GND (8). Few of the remaining 28 pins are actually general purpose GPIO pins, while a few have a dual use. For the Raspberry PI, there are 40 output pins. However, all 40 pins may be programmed. Only 26 of the GPIO pins can be programmed. These are the pins that connect GPIO2 to GPIO27.The remaining pins are utilized for various specific tasks; there are 17 GPIO left (Light green Cirl). Each of these 17 GPIO pins may provide up to 15mA of current. Furthermore, the aggregate of all GPIO currents cannot exceed 50mA. As a result, we may pull a maximum of 3mA from each of these GPIO pins on average.
