#include <esp_now.h>
#include <WiFi.h>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>GPS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFiClient.h>
#include <fstream>

const char* ssid = "TP-Link_DFFE";
const char* password =  "32034608";
String name = "rajiv";

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

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>BLE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// REPLACE WITH THE RECEIVER'S MAC Address
uint8_t broadcastAddress[] = {0x24, 0x6F, 0x28, 0x03, 0x02, 0xA8 };

// Structure example to send data
// Must match the receiver structure
typedef struct struct_message {
    int id; // must be unique for each sender board
    int user;
    int username;
} struct_message;

// Create a struct_message called myData
struct_message myData;

// Create peer interface
esp_now_peer_info_t peerInfo;

// callback when data is sent
void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
  Serial.print("\r\nLast Packet Send Status:\t");
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success" : "Delivery Fail");
}
 
void setup() {
  // Init Serial Monitor
  Serial.begin(115200);

  // Set device as a Wi-Fi Station
  WiFi.mode(WIFI_STA);

  // Init ESP-NOW
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }

  // Once ESPNow is successfully Init, we will register for Send CB to
  // get the status of Trasnmitted packet
  esp_now_register_send_cb(OnDataSent);
 
  // Register peer
  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 0;  
  peerInfo.encrypt = false;
 
  // Add peer        
  if (esp_now_add_peer(&peerInfo) != ESP_OK){
    Serial.println("Failed to add peer");
    return;
  }

 
  //WIFI INIT

  WiFi.begin(ssid, password); 
  
  while (WiFi.status() != WL_CONNECTED) { //Check for the connection
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  
  Serial.println("Connected to the WiFi network");

  //TINY GPS
  ss.begin(GPSBaud);

  Serial.println(F("DeviceExample.ino"));
  Serial.println(F("A simple demonstration of TinyGPSPlus with an attached GPS module"));
  Serial.print(F("Testing TinyGPSPlus library v. ")); Serial.println(TinyGPSPlus::libraryVersion());
  Serial.println(F("by Mikal Hart"));
  Serial.println();

}
 
void loop() {
  // This sketch displays information every time a new sentence is correctly encoded.
  while (ss.available() > 0)
    if (gps.encode(ss.read()))
      displayInfo();

  if (millis() > 5000 && gps.charsProcessed() < 10)
  {
    Serial.println(F("No GPS detected: check wiring."));
    while(true);
  }
  
 // Set values to send
  myData.id = 1;
  myData.user = 1;
  myData.username = 50;

//  // Send message via ESP-NOW
//  esp_err_t result = esp_now_send(broadcastAddress, (uint8_t *) &myData, sizeof(myData));
//   
//  if (result == ESP_OK) {
//    Serial.println("Sent with success");
//  }
//  else {
//    Serial.println("Error sending the data");
//  }
//  delay(60000);
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
  
    Serial.print("Attempted to get GPS location on cold start or facing interference: ");
    Serial.println(httpAudioResponse);
  
   }

   http.end();  //Free resources

   //////////////////////////////SENDING AUDIO FILE//////////////////////////////////
//    UDHttp udh;
//    //open file on sdcard to read
//    root = SD.open("/bark.wav");
//    if (!root) {
//       Serial.println("can not open file!");
//       return;
//    }
//    //upload downloaded file to local server
//    udh.upload("http://192.168.0.169:5000/predict", "/bark.wav", root.size(), rdataf, progressf, responsef);
//    root.close();
//    Serial.printf("done uploading\n");
//  
//  
//  }else{
//  
//    Serial.println("Error in WiFi connection");   
//  
  }

  // Set values to send
  myData.id = 1;
  myData.user = 1;
  myData.username = 50;

  // Send message via ESP-NOW
  esp_err_t result = esp_now_send(broadcastAddress, (uint8_t *) &myData, sizeof(myData));
   
  if (result == ESP_OK) {
    Serial.println("Sent with success");
  }
  else {
    Serial.println("Error sending the data");
  }
  
  delay(15000);
}
