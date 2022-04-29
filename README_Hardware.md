**** HARDWARE REPORT
****
The Woof! Jacket has a water resistance rating of 50 meters under the ISO standard 22810:2010, meaning it may be used during light precipitation. The product is a textile, tailored, comfortable jacket capable of performing physical activity sensing in vivo. The jacket is composed of flexible multi-layer encapsulated sensor modules and microcontrollers. Specifically, it consists of a GPS module, a bluetooth low-energy (BLE) module, a cellular data module, and a microphone. The GPS module is a NEO-6M V2 that is connected to an ESP32 via jumper wires. The microphone is a IMNP-441 sensor that is connected to the ESP32 via jumper wires. The microphone data is collected once the Woof! Jacket comes in contact with another Woof! device’s BLE. Once the BLE received signal strength indicator (RSSI) is strong enough, microphone data is collected for the duration of the encounter. This audio data is collected via the IMNP-441 and is initially stored in the Serial Peripheral Interface Flash File System (SPIFFS) of the ESP32. After collection, the audio data is sent directly to a Flask API that returns a prediction of the encounter. Following  this prediction, the application will then suggest that a user adds another user as a friend if the encounter was determined by the model to be “positive”. The data stored in SPIFFS is then deleted, so new microphone data may be collected for future interactions. 


# HARDWARE REPORT-RECORDING NOTES (MICROPHONE)


![image](https://user-images.githubusercontent.com/75186655/165988065-6be63efc-a519-4610-a5ac-715e2e9fb745.png)

* Sketch samples audio data from I2S microphone, processes the data 
 * with digital IIR filters and calculates A or C weighted Equivalent 
 * Continuous Sound Level (Leq)
 * 
 * I2S is setup to sample data at Fs=48000KHz (fixed value due to 
 * design of digital IIR filters). Data is read from I2S queue 
 * in 'sample blocks' (default 125ms block, equal to 6000 samples) 
 * by 'i2s_reader_task', filtered trough two IIR filters (equalizer 
 * and weighting), summed up and pushed into 'samples_queue' as 
 * sum of squares of filtered samples. The main task then pulls data 
 * from the queue and calculates decibel value relative to microphone 
 * reference amplitude, derived from datasheet sensitivity dBFS 
 * value, number of bits in I2S data, and the reference value for 
 * which the sensitivity is specified (typically 94dB, pure sine
 * wave at 1KHz).
 * i2s_sampling

___________________________________________________________________
This project handles  I2S device INMP441:

This project demonstrates how to use the I2S peripheral for high-speed sampling using DMA to transfer samples directly to RAM.

We can read these samples from the internal ADC or from the I2S peripheral directly.

Samples are read from the DMA buffers and sent to a server running on your laptop/desktop machine.
____________________________________________________________________
The current set of pin assignment in the code are:

ADC
Function	GPIO Pin	Notes
Analogue input	GPIO35	ADC_UNIT_1, ADC1_CHANNEL_7
I2S
Function	GPIO Pin	Notes
bck_io_num	GPIO_NUM_32	I2S - Serial clock
ws_io_num	GPIO_NUM_25	I2S - LRCLK - left right clock
data_in_num	GPIO_NUM_33	I2S - Serial data
i2s_output
This example shows how to drive an I2S output device. 
There is an example WAV file that can be played or you can play a simple sin wave through the output.

To play the WAV file you will need to download the file to the SPIFFS file system.

________________________________________________________________________

# Hardware Report-BLE NOTES (Built in BLE on ESP32)

<img width="622" alt="Screen Shot 2022-04-29 at 12 46 51 PM" src="https://user-images.githubusercontent.com/75186655/165988131-ceb95922-0e1c-4c98-9ce4-5689573669e0.png">
WE setup the ESP32 as a client and as a server. This means we need two different sketches and we will go over them one after the other.It is important to note that the code for this project will be written using the Arduino IDE and it will be impossible to upload the code if your IDE does not have the ESP 32 Arduino board package installed. Once you have the board files installed, it will automatically load several ESP 32 libraries to the Arduino IDE. The libraries comprises of functions and declarations that make sending data through a complex protocol (at least more complex when compared with serial) like the BLE easy.

__________________________________________________________________________-
# Hardware Report- GPS NOTES (GPS MODULE )
<img width="435" alt="Screen Shot 2022-04-29 at 1 01 51 PM" src="https://user-images.githubusercontent.com/75186655/165990287-45909a94-cce6-4990-b3c1-c0c960cf38db.png">
Neo-GPS  is a high-performance, highly integrated multi-mode satellite positioning, and navigation module. The Neo-GPS  module comes with GPS  board and grove cable. This module supports GPS/Beidou/Glonass/Galileo/QZSS/SBAS that makes it suitable for GNSS positioning applications. The  module is capable of receiving more than 6 satellites at the same time. This works quickly and accurately under the condition of a bad signal. The module features low power consumption at 31µA, compatible hard/soft interface for other modules, and positioning error within 10 meters.
The  module adopts the integrated design of RF baseband, that integrates DC/DC, LDO, LNA, RF front-end, baseband processing, and 32-bit RISC based chip. This module includes the Air530 TX indicator (blue LED), 1PPS indicator (green LED), Air530 module, grove interface, Air530 headers, and 3V button battery. The GPS module operates at 3.3V/5V supply voltage and -35°C to 85°C temperature range. Typical applications include GPS tracker, GPS navigation, distance measurement, car navigation, and drone.
______________________________________________________________________________
Hardware Report-  GPS/GSM NOTES - GSM Module

Bluetooth and GPS trackers differ in many ways. In general, GPS trackers maintain a constant connection via satellite and provide real-time tracking. Bluetooth trackers work within a shorter range and are dependent on a connection to a Bluetooth enabled device. Bluetooth trackers typically cost less, are lighter and use less power. In this project, we utilize both to optimize finding location under various circumstances. The built in GSM module utilizes Bluetooth, and has 250 ft or 75m range. However, as with all wireless technologies, different environments impact the effective range of Bluetooth signals. If your device is out of Bluetooth range, you can check its last known location on the app. This information is automatically updated whenever anyone in the GSM community comes within Bluetooth range of your GSM. All location and user information is secure and used exclusively for finding accuracy. We do not sell any user data.
<img width="324" alt="Screen Shot 2022-04-29 at 5 30 02 PM" src="https://user-images.githubusercontent.com/75186655/166071703-d8d766ba-de3f-4c72-ab56-677a3de33fbd.png">

_______________________________________________________________________________
**Hardware Report - Power Notes (Microcontroller+sensors)**

The Woof! Jacket is first powered using 3 AAA batteries. Three standard AAA batteries produce approximately 4.5v when fully charged. The load is 0.5 watts. Watts=amps x volts, so 0.5 watts at 4.5 volts is about 110 milliamps, or .11 amps. An average AAA alkaline battery contains about 1000 milliamp-hours, so, therefore, the batteries would last a maximum of 9.09 straight hours of use, assuming perfect conditions. In reality, you can probably deduct about an hour from that rating, as the battery will not be 100% efficient as it becomes discharged. The wattage will remain the same, so as the voltage of the battery drops towards the end of its runtime, the amperage will increase, thus draining the battery faster. Therefore,  one can  estimate that 7–8 hours of usage is how long it will take to drain the battery.  Once the batteries are inserted into the battery pocket of the jacket, and the battery pocket is sealed,  the Woof! jacket is to be  safely placed onto the dog. Please ensure that the velcros are secure and the jacket is firmly fitted. Once the jacket is on the dog, open up the Woof! application and sign in to your account. 

![image](https://user-images.githubusercontent.com/75186655/166071924-9e2c4b9f-c84b-41ce-8038-072e49a4fbad.png)

_______________________________________________________________________________
**OVERVIEW**

**_PRODUCT INTERIOR_**
<img width="151" alt="Screen Shot 2022-04-29 at 1 10 44 PM" src="https://user-images.githubusercontent.com/75186655/165991386-490ef6ed-8e10-4ff1-8eef-5db78d457b11.png">

_**MICROPHONE ASSEMBLY INSTRUCTIONS**_
<img width="529" alt="Screen Shot 2022-04-29 at 1 12 16 PM" src="https://user-images.githubusercontent.com/75186655/165991569-b48156c4-660c-438d-b853-52f0b0fad643.png">

_**GPS ASSEMBLY INSTRUCTIONS**_
<img width="612" alt="Screen Shot 2022-04-29 at 1 13 36 PM" src="https://user-images.githubusercontent.com/75186655/165991741-0522da2e-767a-44d7-9a8f-a0d142079653.png">

When working with IoT, it’s often necessary to track a device’s location for monitoring. Global Positioning Service (GPS) remains the number 1 option for large-area tracking. 
___________________________________________________________________________
**BILL OF MATERIALS / VENDOR INFORMATION
<img width="549" alt="Screen Shot 2022-04-29 at 1 17 56 PM" src="https://user-images.githubusercontent.com/75186655/165992406-bda1c8fd-406d-4240-a0cd-da6fa289a2e4.png">![Uploading Screen Shot 2022-04-29 at 5.26.56 PM.png…]()
__________________________________________________________
**
