#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFiClient.h>
#include <fstream>
#include "UDHttp.h"

const char* ssid = "TP-Link_DFFE";
const char* password =  "32034608";

const uint16_t port = 8090;
const char * host = "155.41.93.5";
 

//..........................>>>>>SD OPERATIONS<<<<<..........................

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


//..........................>>>>>SD OPERATIONS<<<<<..........................
//..........................>>>>>UDHttp<<<<<.................................
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


//..........................>>>>>UDHttp<<<<<.................................

void setup(){
  Serial.begin(115200);
  delay(10000);

  //.............................WIFI connection..........................................
  
  WiFi.begin(ssid, password); 

  while (WiFi.status() != WL_CONNECTED) { //Check for the connection
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  
  Serial.println("Connected to the WiFi network");
  Serial.println(WiFi.localIP());


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

  
}

void loop() {
//  WiFiClient client;
// 
//    if (!client.connect(host, port)) {
// 
//        Serial.println("Connection to host failed");
// 
//        delay(1000);
//        return;
//    }
// 
//    Serial.println("Connected to server successful!");
// 
//    client.print("Hello from ESP32!");
// 
//    Serial.println("Disconnecting...");
//    client.stop();
// 
//    delay(10000);
  
  if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status
  
   HTTPClient http;   
  
   http.begin("http://192.168.0.169:5000/predict");  //Specify destination for HTTP request
   http.addHeader("Content-Type", "application/json");             //Specify content-type header
   //int httpAudioResponse = http.POST("POSTING from ESP32");   //Send the actual POST request
   StaticJsonDocument<200> doc;

   doc["username"] = "rajiv";

   String requestBody;
   serializeJson(doc, requestBody);

   //int httpAudioResponse = http.POST(requestBody);

//   if(httpAudioResponse>0){
//  
//  
//    Serial.println(httpAudioResponse);   //Print return code
//    
//  
//   }else{
//  
//    Serial.print("Error on sending POST for NAME: ");
//    Serial.println(httpAudioResponse);
//  
//   }

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

  
