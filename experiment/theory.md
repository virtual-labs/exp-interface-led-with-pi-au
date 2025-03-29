### Theory
Controlling an LED with a Raspberry Pi serves as an introductory exercise to explore the functionality of its General Purpose Input/Output (GPIO) pins. The hardware and programming techniques employed in this simple circuit—blinking an LED—are foundational and can be extended to interface with a wide range of sensors and modules in more complex applications. In this experiment, a Python program is developed to toggle an LED on and off every two seconds, providing hands-on experience with GPIO pin configuration and control. The circuit consists of an LED connected to a GPIO pin, with its anode (longer leg) linked through a current-limiting resistor (330 Ω to 1 kΩ) to the GPIO pin and its cathode (shorter leg) connected to ground (GND). The Python code alternates the GPIO pin between HIGH (3.3V) and LOW (0V) states at two-second intervals, causing the LED to blink.

Components Used in This Experiment:
- Raspberry Pi
- One LED (any color)
- One Resistor (330 Ω to 1 kΩ)
- Connecting Wires (Male-to-Female)
- One Mini Breadboard
<p>
To ensure safety and prevent damage, the Raspberry Pi must be powered off during hardware setup. Connecting or disconnecting components while the device is powered risks electrostatic discharge (ESD) or damage due to incorrect pin connections.
</p>

###### Raspberry Pi Overview
The Raspberry Pi is a compact single-board computer equipped with GPIO pins, making it an ideal platform for embedded system development. Featuring an ARM-based architecture, it is designed for engineers, hobbyists, and developers, offering a reliable foundation for projects ranging from basic circuits to advanced applications like image processing and Internet of Things (IoT) systems. Models such as the Raspberry Pi 4, with up to 8GB of RAM, provide enhanced performance for demanding tasks.
<p>
The GPIO pins are a key feature, serving as the physical interface between the Raspberry Pi and external components such as LEDs, motors, and sensors. The Raspberry Pi 3 Model B, for example, includes 40 GPIO pins: 2x 3.3V, 2x 5V, 8x GND, and 26 programmable pins (GPIO2 to GPIO27). Of these, 17 pins are general-purpose and can supply up to 15mA each, with a total current limit of 50mA across all GPIO pins, averaging approximately 3mA per pin. Understanding GPIO pin functionality is essential for this experiment and future applications.</p>