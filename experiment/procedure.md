### Procedure 

#### Hardware Setup
1. Identify the two pins of the LED:
   - The longer pin is the positive terminal (anode).
   - The shorter pin is the negative terminal (cathode).
2. Connect the negative terminal (shorter pin) to the Ground (GND) pin of the Raspberry Pi.
3. Connect the positive terminal (longer pin) to a separate line on the breadboard.
4. Attach one end of a resistor to the same line as the positive LED terminal.
5.Link the other end of the resistor to any GND pin on the Raspberry Pi.

#### Software Setup

##### 1. Controlling the LED with Python 3 on Raspberry Pi OS
Once the hardware is set up, the LED can be controlled using Python 3. The following process enables LED control:

- Import the RPi.GPIO module, which provides access to the GPIO pins.
- Import the time module to introduce time delays in execution.
- Define a global constant for the LED's GPIO number to improve code readability and reduce errors.
- Configure the Raspberry Pi to use GPIO numbers instead of physical pin numbers.
- Set up the GPIO pin as an output using GPIO.setup().

##### 2. Making the LED Blink
- Maintain the same GPIO configuration.
- Implement an infinite loop that toggles the LED on and off at set intervals.
- The LED remains ON for 1 second and OFF for 2 seconds.
- The loop runs indefinitely until manually interrupted using either the stop button in the Thonny IDE or CTRL+C in the terminal.

#### Python Code Implementation

```python
import RPi.GPIO as GPIO
import time

# Define the GPIO pin number for the LED
LED_PIN = 17

# Set the GPIO mode to BCM (Broadcom pin-numbering scheme)
GPIO.setmode(GPIO.BCM)

# Set up the LED pin as an output
GPIO.setup(LED_PIN, GPIO.OUT)

try:
    while True:
        # Turn the LED on (HIGH state)
        GPIO.output(LED_PIN, GPIO.HIGH)
        time.sleep(1)  # Wait for 1 second

        # Turn the LED off (LOW state)
        GPIO.output(LED_PIN, GPIO.LOW)
        time.sleep(2)  # Wait for 2 seconds

except KeyboardInterrupt:
    # Clean up GPIO settings when exiting the program
    GPIO.cleanup()
```
