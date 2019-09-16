# Week 1 - Arduino

## Things to do before the class

- [View Arduino, The documentary](https://vimeo.com/18539129) (28 min)

## What's Arduino?

Arduino is a collection of 3 tools, forming the Arduino Toolkit. First of all, there's the Arduino controller (hardware), which is available in many formats. The schematics are open source, and everybody can assemble them on their own if wanted. The second part of the Arduino Toolkit is the language and compiler. These enable you to write programs to execute by the controller. Lastly, we've got the Arduino IDE: the coding environment where you can write an Arduino program and upload to a controller.

The goal of Arduino is to enable people to easily build interactive installations, linking hardware and software together. You can read input from different kinds of sensors (push buttons, light sensors, temperature sensors, gyroscopes, distance sensors, ...) and control other electronics (leds, motors, ...)

## Installation and setup

You'll need an Arduino compatible board. You can check a list of supported boards at https://www.arduino.cc/en/Main/Products. We will be using the Arduino UNO board during this course. Next to a board, you'll need some LEDs, resistors, sensors, ...

Next to a board, you'll need the Arduino IDE. Download the Arduino IDE at https://www.arduino.cc/en/Main/Software

### Hello Arduino

We'll do a first quick test of your Arduino board and the IDE. Open op the Arduino IDE. You'll be presented with a screen like the image below:

![Image of Arduino IDE](arduino-ide.png)

It consists of a large text area where you'll write your code, a button bar on top, a logging area below and a status bar.

We will try to run the "Blink" example on the Arduino board.

1. Open up `File > Examples > 01.Basics > Blink`. The code opens in the IDE.
2. Connect your Arduino Board on a free USB port.
3. Make sure that `Tools > Board > Arduino/Genuino Uno` is selected in the menu.
4. Make sure that a port with an Arduino is selected in `Tools > Port`. The usb port with the arduino should mention something like (Arduino/Genuino Uno) at the end.
5. Click on the right-pointing arrow button to upload the Sketch to the board.

If everything works as it should, you should see the onboard LED blink on the board!

`TODO: Insert blinking GIF`

Take a look at the code from this example. The language you write Arduino code in is the C programming language. We can identify a couple of parts in this Sketch:

- `void setup()`: The code in this function only runs once at startup of the program
- `void draw()`: The code in this function runs continuously. As soon as this function exits, it runs again. You can interpret this as some sort of endless loop.
- `pinMode`: By using this function you can configure a certain pin on the arduino as either OUTPUT or INPUT. An output pin is used to drive an external component, whereas an INPUT pin is used to read a value from a pin (eg to read a sensor value).
- `digitalWrite`: We use this function to write a binary value (HIGH or LOW) to a given pin number.
- `delay`: This function pauses the execution of the program for a given amount of time in milliseconds.

## A first electrical circuit

Let's spice things up a little bit. Instead of blinking the on board LED, we'll connect a real LED to the Arduino.

To make an LED light up, it'll need electricity running through it. That electric current needs to flow from somewhere to a destination. Just like water in a rivier, it will flow from a high potential to a low potential. You'll need to be careful about the amount of current flowing through the LED at any given time. Just like with the river analogy, too much current / pressure might destroy a component (our LED). We will add a resistor to our circuit, to limit the current.

We've used a couple of terms in the paragraph above, which are expressed in different units:

- Voltage (V): the difference between the high and low potential in a circuit, expressed in Volts.
- Current (I): the amount of current flowing in a circuit, expressed in Ampere.
- Resistance (R): a resistance in a circuit, expressed in Ohms.

There is a close connection between these 3, expressed in Ohm's law. As you can read on the [Wikipedia page on Ohm's law](https://en.wikipedia.org/wiki/Ohm's_law): "Ohm's law states that the current through a conductor between two points is directly proportional to the voltage across the two points."

![I = V / R](http://www.sciweavers.org/tex2img.php?eq=I%20%3D%20%5Cfrac%7BV%7D%7BR%7D&bc=White&fc=Black&im=jpg&fs=12&ff=arev&edit=0)

Where I stands for current, V for voltage and R for resistance.

### An LED in a circuit

When we want to connect an LED to an Arduino, the schematic would look something like this:

![schematic view of led connected to an Arduino](led-basic-wires-schematic.png)

The same schematic looks like this in an illustrated preview:

![preview of led connected to an Arduino](led-basic-wires-preview.png)

We could get our hands dirty with a soldering iron, and melt wires and components together, but this would be a pretty slow prototyping / testing proces. Instead of that, we'll use a breadboard.

Breadboards make it easier to prototype electronic circuits. Make sure to [read the chapter "Anatomy of a breadboard" on the Sparkfun website](https://learn.sparkfun.com/tutorials/how-to-use-a-breadboard/#anatomy-of-a-breadboard) before continuing.

Build the circuit below using a breadboard and test the Blink example again. The LED should turn on and off.

![preview of the led with breadboard wiring](led-basic-breadboard-preview.png)

If it doesn't, check the following potential issues:

- The long connector from the LED should be connected to pin 13.
- The resistor should have a value below 1000 Ohms (1 KOhm). Resistance values can be read using the colored stripes on them (see [resistor-calculator.com](http://www.resistor-calculator.com/)). The one in the picture is a 220 Ohm resistor.

## Arduino Basic Tutorials

Go through the following tutorials from the Arduino website to get yourself familiar with common components. Do not copy / paste the code without reading and understanding what the code does step by step.

1. [Reading a button value](https://www.arduino.cc/en/Tutorial/DigitalReadSerial)
2. [Turn an LED on / off using a button](https://www.arduino.cc/en/Tutorial/Button)
3. [Debouncing button input](https://www.arduino.cc/en/Tutorial/Debounce)
4. [Reading a potentiometer value](https://www.arduino.cc/en/Tutorial/AnalogReadSerial)
5. [Fading an LED](https://www.arduino.cc/en/Tutorial/Fading)
6. [Fading an LED using a potentiometer](https://www.arduino.cc/en/Tutorial/AnalogInOutSerial)
7. [Reading input from a photocell](https://learn.sparkfun.com/tutorials/photocell-hookup-guide)
8. [Using an ultrasonic distance sensor](https://www.arduino.cc/en/Tutorial/Ping)
9. [Controlling a Servo motor](https://www.arduino.cc/en/Tutorial/Sweep)
10. [Using a potentiometer to control a Servo](https://www.arduino.cc/en/Tutorial/Knob)

### Powering an Arduino circuit

Right now, you've been powering the Arduino circuit from your USB port, supplying the Arduino with a steady 5V. This is fine for running circuits using a couple of basic components such as a single LED or one servo. However, once you start expanding your circuits, the power from your USB port might not suffice. This is when external power sources come in play.

An Arduino remembers the last sketch that was uploaded to it. As soon as it receives enough power, it will boot and run the last code that was uploaded. An easy way to run an Arduino standalone, is by using a USB charger.

![usb cellphone charger](usb-charger.jpg)

Another way of powering the Arduino is through the VIN pin. Connect a battery source between 7V and 12V to the VIN and GND pins, as seen below:

![9v power source](power-9v.png)

You can combine multiple power sources. Make sure the components get the right voltage, and all grounds are connected together. In the example below, we're powering 5V to servo motors and 9V to the Arduino:

![a 5v and 9v power source in a circuit](5v-servos-9v-arduino.png)

### Transistors

A transistor allows you to amplify or switch an electrical signal. You can use this to control a circuit that's carrying a higher voltage or higher current from your Arduino.

The 3 connectors from a transistor are called Emitter, Base and Collector. There are 2 types of transistors: NPN and PNP transistors. You can use both of these types as switches or amplifiers, the difference exists in the way you connect their pins.

#### NPN Transistor

You can switch an NPN transistor by applying a positive voltage to the base bin. Current will flow from Collector to Emitter:

![npn transitor](npn.png)

#### PNP Transistor

A PNP transistor switches when you apply a lower voltage to the Base pin compared with the Emitter pin. Current will flow from Emitter to Collector:

![pnp transistor](pnp.png)

#### Control a 5V LED with an NPN transistor

As a first test, we'll control a led using a transistor. This might seem overkill, but it's a good start, without much risk of damaging our components.

The transistor in your kit is a small black block with a straight side and a curved side. The type number is printed on the block, we'll be using a PN222A transistor, which is an NPN transistor:

![npn transitor pins](npn-pins.png)

Double check the type number on the component. Lookup the pinout of the base, collector and emitter in case it's not a PN222A.

Create the circuit as shown in the illustration below. The led gets its power from the 5V pin on the Arduino. By switching the transistor from pin 13, current will flow from the LED to GND. Test the circuit using the blink example code.

![circuit controlling led with npn transistor](npn-led.png)

#### Control a DC motor using an NPN transistor

Next up you'll control a DC motor using the same PN222A NPN-transistor.