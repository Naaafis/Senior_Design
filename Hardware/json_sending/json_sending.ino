#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
  
const char* ssid = "TP-Link_DFFE";
const char* password =  "32034608";
String name = "rajiv";
//File fsUploadFile;
  
void setup() {
  
  Serial.begin(115200);
  delay(4000);   //Delay needed before calling the WiFi.begin
  
  WiFi.begin(ssid, password); 
  
  while (WiFi.status() != WL_CONNECTED) { //Check for the connection
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  
  Serial.println("Connected to the WiFi network");
  
}
  
void loop() {
  
 if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status
  
   HTTPClient http;   
  
   http.begin("http://155.41.42.223:5000/predict");  //Specify destination for HTTP request
   http.addHeader("Content-Type", "application/json");             //Specify content-type header
   //http.addHeader("Content-Type", "audio/x-wav"); 

   // int httpResponseCode = http.POST("POSTING from ESP32");   //Send the actual POST request
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
  
 }else{
  
    Serial.println("Error in WiFi connection");   
  
 }
  
  delay(10000);  //Send a request every 10 seconds
  
}
