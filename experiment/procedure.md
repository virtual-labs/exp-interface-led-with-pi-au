### Procedure
**Hardware Setup –**

1. Examine the two pins on the LED. The longer pin is the positive (+ve) terminal (anode), and the shorter pin is the negative (-ve) terminal (cathode).
2.  Connect the shorter pin (negative, -ve) to the GND line and the longer pin (positive, +ve) to any other connection.
3. Connect one resistor pin to the same line as the longer LED pin (positive, +ve), and the other resistor pin to a separate line.
4. Connect one wire between the same line as the other resistor pin and the GPIO number [17] to complete the circuit (more on Raspberry Pi pins and GPIOs).

**Software Setup –**

1. **Control the LED with Python 3 on Raspberry Pi OS –**
   - Now that the hardware and software are properly configured, we can begin controlling the LED on the Raspberry Pi with Python3.
   - This programme will turn on the LED for one second before turning it off.
   - First, we import the RPi.GPIO Python module, which allows us to control all GPIOs on the Raspberry Pi through the GPIO header.
   - We also include the time module, which will be used later to wait 2 seconds.
   - Create a "constant" global variable with the LED's GPIO number. This allows you to utilise the variable name rather than the number directly. It will produce fewer errors.
   - Use the RPi.GPIO module to execute. This allows you to utilise GPIO numbers rather than "normal" pin numbers.
   - Setting up the GPIO for the LED needs to use the GPIO.setup() function and provide the mode of the GPIO: either GPIO.OUT for output, or GPIO.IN for input.
2. **Make the LED blink –**
   - The configuration is the same.
   - Then, in an infinite loop, we simply switch between GPIO.HIGH and GPIO.LOW every second.
   - Because of the endless loop, the loop does not exit on its own.
   - As a result, you must stop/kill the application manually, either by selecting the "stop" button on Thonny IDE or by typing CTRL+C in the shell panel.

3. **Python Code –**

       import RPi.GPIO as GPIO
       import time
       LED_PIN = 17
       GPIO.setmode(GPIO.BCM)
       GPIO.setup(LED_PIN, GPIO.OUT)
       try:
           while True:
               GPIO.output(LED_PIN, GPIO.HIGH)
               time.sleep(1)
               GPIO.output(LED_PIN, GPIO.LOW)
               time.sleep(2)
       except KeyboardInterrupt:
           GPIO.cleanup()