// ESP32 offboard timer sensor
// Reads the sensor on a 1-second hardware timer and sends the reading over WiFi.
// Flash this with the Arduino IDE (Board: ESP32 Dev Module).
#include <WiFi.h>
#include <HTTPClient.h>

const char* WIFI_SSID = "YOUR_SSID";
const char* WIFI_PASSWORD = "YOUR_PASSWORD";
const char* ENDPOINT = "https://api.example.com/sensor";

#define SENSOR_PIN 34

hw_timer_t* timer = NULL;
volatile bool shouldSend = false;

void IRAM_ATTR onTimer() {
  shouldSend = true;
}

float readSensor() {
  int raw = analogRead(SENSOR_PIN);
  return raw / 4095.0f;
}

void sendReading() {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(ENDPOINT);
  http.addHeader("Content-Type", "application/json");

  char payload[128];
  snprintf(payload, sizeof(payload),
           "{\"sensor\": %.2f, \"timestamp\": %lu}",
           readSensor(), millis());

  int code = http.POST(payload);
  Serial.printf("POST -> %d\n", code);
  http.end();
}

void setup() {
  Serial.begin(115200);
  pinMode(SENSOR_PIN, INPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");

  timer = timerBegin(0, 80, true);       // 80 MHz / 80 = 1 MHz
  timerAttachInterrupt(timer, &onTimer, true);
  timerAlarmWrite(timer, 1000000, true); // 1 second
  timerAlarmEnable(timer);
}

void loop() {
  if (shouldSend) {
    shouldSend = false;
    sendReading();
  }
}