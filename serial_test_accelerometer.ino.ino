#include<Wire.h>
#include "esp_http_client.h"
#include <WiFi.h>
#include "Arduino.h"

unsigned long previousMillis = 0;
unsigned long interval = 30000;
const char* ssid = "TP-Link_DFFE";
const char* password = "32034608";


//const char *post_url = "localhost:8000"; 
//const char *post_data = "field1=value1&field2=value2";  // Post data can be name value, or just value

const int MPU_ADDR = 0x68; // I2C address of the MPU-6050
int16_t AcX, AcY, AcZ, Tmp, GyX, GyY, GyZ;
 int incomingBtye =0;

void initWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
}
void setup() {
   Serial.begin(115200);

  initWiFi();
  Serial.print("RSSI: ");
  Serial.println(WiFi.RSSI());
   
   Wire.begin(21, 27, 100000); // sda, scl, clock speed
   Wire.beginTransmission(MPU_ADDR);
   Wire.write(0x6B);  // PWR_MGMT_1 register
   Wire.write(0);     // set to zero (wakes up the MPU−6050)
   Wire.endTransmission(true);
   Serial.println("Setup complete");




}


void loop() {

unsigned long currentMillis = millis();
  // if WiFi is down, try reconnecting every CHECK_WIFI_TIME seconds
  if ((WiFi.status() != WL_CONNECTED) && (currentMillis - previousMillis >=interval)) {
    Serial.print(millis());
    Serial.println("Reconnecting to WiFi...");
    WiFi.disconnect();
    WiFi.reconnect();
    previousMillis = currentMillis;
  }
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x3B);  // starting with register 0x3B (ACCEL_XOUT_H)
  Wire.endTransmission(true);
  Wire.beginTransmission(MPU_ADDR);
  Wire.requestFrom(MPU_ADDR, 14, true); // request a total of 14 registers
  AcX = Wire.read() << 8 | Wire.read(); // 0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)
  AcY = Wire.read() << 8 | Wire.read(); // 0x3D (ACCEL_YOUT_H) & 0x3E (ACCEL_YOUT_L)
  AcZ = Wire.read() << 8 | Wire.read(); // 0x3F (ACCEL_ZOUT_H) & 0x40 (ACCEL_ZOUT_L)
  Tmp = Wire.read() << 8 | Wire.read(); // 0x41 (TEMP_OUT_H) & 0x42 (TEMP_OUT_L)
  GyX = Wire.read() << 8 | Wire.read(); // 0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)
  GyY = Wire.read() << 8 | Wire.read(); // 0x3D (ACCEL_YOUT_H) & 0x3E (ACCEL_YOUT_L)
  GyZ = Wire.read() << 8 | Wire.read(); // 0x3F (ACCEL_ZOUT_H) & 0x40 (ACCEL_ZOUT_L)
  //AcX=AcX/22;
  //AcX=AcX-750;
  //AcY=AcY/22;
  //AcZ=AcZ/22;

  float X = AcX/1692.0;
  float Y = AcY/1692.0;
  float Z = AcZ/1692.0;

  Serial.print(X); Serial.print(" , ");
  Serial.print(Y); Serial.print(" , ");
  Serial.print(Z); Serial.print(" \n ");
  if(abs(X)>abs(Y) && abs(X)>abs(Z) && abs(Y)<1 && abs(Z) < 1){
  Serial.print(" Dog is Sitting ");Serial.print(" \n ");
  }
  //if(abs(X)>5 && abs(Z)>5) {
  //  Serial.print("Dog is Running");
 // }
  if((abs(Y)>2 || abs(Z)>2) ) {
    Serial.print("Dog is Running"); Serial.print(" \n ");
  }
  if(abs(X)>10 && abs(Y)<3 && abs(Z) < 3){
    Serial.print("Dog is Jumping"); Serial.print("\n");
  }
  delay(1000);
 // Serial.print(GyX); Serial.print(" , ");
//  Serial.print(GyY); Serial.print(" , ");
//  Serial.print(GyZ); Serial.print("\n");

}
