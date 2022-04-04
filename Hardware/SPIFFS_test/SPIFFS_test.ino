#include "SPIFFS.h"
#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>

const char* ssid = "TP-Link_DFFE";
const char* password =  "32034608";


void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password); 

  while (WiFi.status() != WL_CONNECTED) { //Check for the connection
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  
  Serial.println("Connected to the WiFi network");
  
 
  if (!SPIFFS.begin(true)) {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }
 
  File root = SPIFFS.open("/");
 
  File file = root.openNextFile();
 
  while(file){
 
      Serial.print("FILE: ");
      Serial.println(file.name());
 
      file = root.openNextFile();
  }

  if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status
  
   HTTPClient http;   
  
   http.begin("http://168.122.134.110:5000/predict");  //Specify destination for HTTP request
   http.addHeader("Content-Type", "application/json");             //Specify content-type header
   //int httpResponseCode = http.POST("POSTING from ESP32");   //Send the actual POST request
   StaticJsonDocument<200> doc;

   doc["username"] = "rajiv";

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
  
  }
  else{
  
    Serial.println("Error in WiFi connection");   
  
  }
}

void loop() {
  
}
