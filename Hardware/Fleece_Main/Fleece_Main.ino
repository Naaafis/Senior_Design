//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>WIFI HTTP INIT<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFiClient.h>
#include <fstream>

#include "UDHttp.h"

const char* ssid = "TP-Link_DFFE";
const char* password =  "32034608";
String name = "rajiv";


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SD INIT<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
#include "FS.h"
#include "SD.h"
#include "SPI.h"

File root; 

void listDir(fs::FS &fs, const char * dirname, uint8_t levels){
  Serial.printf("Listing directory: %s\n", dirname);

  File root = fs.open(dirname);
  if(!root){
    Serial.println("Failed to open directory");
    return;
  }
  if(!root.isDirectory()){
    Serial.println("Not a directory");
    return;
  }

  File file = root.openNextFile();
  while(file){
    if(file.isDirectory()){
      Serial.print("  DIR : ");
      Serial.println(file.name());
      if(levels){
        listDir(fs, file.name(), levels -1);
      }
    } else {
      Serial.print("  FILE: ");
      Serial.print(file.name());
      Serial.print("  SIZE: ");
      Serial.println(file.size());
    }
    file = root.openNextFile();
  }
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>TINY GPS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>

/*
   This sample sketch demonstrates the normal use of a TinyGPSPlus (TinyGPSPlus) object.
   It requires the use of SoftwareSerial, and assumes that you have a
   4800-baud serial GPS device hooked up on pins 4(rx) and 3(tx).
*/
static const int RXPin = 16, TXPin = 17;
static const uint32_t GPSBaud = 9600;

// The TinyGPSPlus object
TinyGPSPlus gps;

// The serial connection to the GPS device
SoftwareSerial ss(RXPin, TXPin);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>TINY GPS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>UD HTTP<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

int responsef(uint8_t *buffer, int len){
  Serial.printf("%s\n", buffer);
  return 0;
}

int rdataf(uint8_t *buffer, int len){
  //read file to upload
  if (root.available()) {
    return root.read(buffer, len);
  }
  return 0;
}

int wdataf(uint8_t *buffer, int len){
  //write downloaded data to file
  return root.write(buffer, len);
}

void progressf(int percent){
  Serial.printf("%d\n", percent);
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>UD HTTP<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


void setup()
{
  //INIT
  Serial.begin(115200);

  //WIFI

  WiFi.begin(ssid, password); 
  
  while (WiFi.status() != WL_CONNECTED) { //Check for the connection
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  
  Serial.println("Connected to the WiFi network");

  //SD initialization.............................................

  
  if(!SD.begin(27)){
    Serial.println("Card Mount Failed");
    return;
  }
  uint8_t cardType = SD.cardType();

  if(cardType == CARD_NONE){
    Serial.println("No SD card attached");
    return;
  }

    Serial.print("SD Card Type: ");
  if(cardType == CARD_MMC){
    Serial.println("MMC");
  } else if(cardType == CARD_SD){
    Serial.println("SDSC");
  } else if(cardType == CARD_SDHC){
    Serial.println("SDHC");
  } else {
    Serial.println("UNKNOWN");
  }

  uint64_t cardSize = SD.cardSize() / (1024 * 1024);
  Serial.printf("SD Card Size: %lluMB\n", cardSize);

  listDir(SD, "/", 0);
  
  Serial.printf("Total space: %lluMB\n", SD.totalBytes() / (1024 * 1024));
  Serial.printf("Used space: %lluMB\n", SD.usedBytes() / (1024 * 1024));


  //TINY GPS
  ss.begin(GPSBaud);

  Serial.println(F("DeviceExample.ino"));
  Serial.println(F("A simple demonstration of TinyGPSPlus with an attached GPS module"));
  Serial.print(F("Testing TinyGPSPlus library v. ")); Serial.println(TinyGPSPlus::libraryVersion());
  Serial.println(F("by Mikal Hart"));
  Serial.println();
}


void loop()
{
  // This sketch displays information every time a new sentence is correctly encoded.
  while (ss.available() > 0)
    if (gps.encode(ss.read()))
      displayInfo();

  if (millis() > 5000 && gps.charsProcessed() < 10)
  {
    Serial.println(F("No GPS detected: check wiring."));
    while(true);
  }
  //xTaskCreate(GPS, "GPS", 1024 * 2, NULL, 1, NULL);
}

void displayInfo()
{
  Serial.println(gps.time.value()); // Raw time in HHMMSSCC format (u32)
  Serial.println(gps.time.hour()); // Hour (0-23) (u8)  
  Serial.println(gps.time.minute()); // Minute (0-59) (u8)  
  Serial.println(gps.time.second()); // Second (0-59) (u8)   
  Serial.println(gps.satellites.value()); // Number of satellites in use (u32)

  Serial.print(F("Location: ")); 
  if (gps.location.isValid())
  {
    Serial.print(gps.location.lat(), 6);
    Serial.print(F(","));
    Serial.print(gps.location.lng(), 6);
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.print(F("  Date/Time: "));
  if (gps.date.isValid())
  {
    Serial.print(gps.date.month());
    Serial.print(F("/"));
    Serial.print(gps.date.day());
    Serial.print(F("/"));
    Serial.print(gps.date.year());
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.print(F(" "));
  if (gps.time.isValid())
  {
    if (gps.time.hour() < 10) Serial.print(F("0"));
    Serial.print(gps.time.hour());
    Serial.print(F(":"));
    if (gps.time.minute() < 10) Serial.print(F("0"));
    Serial.print(gps.time.minute());
    Serial.print(F(":"));
    if (gps.time.second() < 10) Serial.print(F("0"));
    Serial.print(gps.time.second());
    Serial.print(F("."));
    if (gps.time.centisecond() < 10) Serial.print(F("0"));
    Serial.print(gps.time.centisecond());
  }
  else
  {
    Serial.print(F("INVALID"));
  }

  Serial.println();

  if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status
  
   HTTPClient http;   
  
   http.begin("http://192.168.0.169:5000/gps");  //Specify destination for HTTP request
   http.addHeader("Content-Type", "application/json");             //Specify content-type header
   //http.addHeader("Content-Type", "audio/x-wav"); 

   // int httpResponseCode = http.POST("POSTING from ESP32");   //Send the actual POST request
   StaticJsonDocument<400> doc;

   doc["Longitude"] = (String) gps.location.lng();
   doc["Latitude"] = (String) gps.location.lat();

   String requestBody;
   serializeJson(doc, requestBody);

   int httpAudioResponse = http.POST(requestBody);

   if(httpAudioResponse>0){
  
  
    Serial.println(httpAudioResponse);   //Print return code
    
  
   }else{
  
    Serial.print("Error on sending POST for NAME: ");
    Serial.println(httpAudioResponse);
  
   }

   http.end();  //Free resources

   //////////////////////////////SENDING AUDIO FILE//////////////////////////////////
    UDHttp udh;
    //open file on sdcard to read
    root = SD.open("/bark.wav");
    if (!root) {
       Serial.println("can not open file!");
       return;
    }
    //upload downloaded file to local server
    udh.upload("http://192.168.0.169:5000/predict", "/bark.wav", root.size(), rdataf, progressf, responsef);
    root.close();
    Serial.printf("done uploading\n");
  
  
  }else{
  
    Serial.println("Error in WiFi connection");   
  
  }
  

  delay(15000);
}
