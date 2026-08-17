---
title: ESP32 and the Joy of Physical Computing
date: Feb 15, 2026
excerpt: There is a special kind of satisfaction in writing code that makes something in the real world move, blink, or beep.
tags:
  - ESP32
  - Embedded
---
Software development is mostly abstract. We manipulate data structures that exist only in memory, building systems that serve HTTP requests or render pixels on a screen. It's satisfying work, but it's also distant from the physical world.

Physical computing changes that.

## The ESP32

The ESP32 is a remarkable piece of hardware. For a few dollars, you get:

- A dual-core processor
- WiFi and Bluetooth
- Dozens of GPIO pins
- ADC, DAC, PWM, I2C, SPI — the whole alphabet

It's the kind of chip that makes you want to build things just to see what it can do.

## My First Project

My first ESP32 project was an offboard timer sensor. Nothing glamorous. A sensor that reads data at regular intervals and sends it somewhere. But the moment I saw it working — the LED blinking, the data flowing — I felt something that pure software rarely gives me.

The satisfaction of making a thing work in the real world.

## What Hardware Teaches You

Working with hardware teaches you things that software alone cannot:

- **Patience**: Debugging a circuit is harder than debugging code
- **Precision**: A loose wire can ruin hours of work
- **Humility**: The computer does exactly what you tell it, not what you meant

## The Sensor Project

The offboard timer sensor I built reads environmental data and logs it. The code is simple — set up a timer, read the sensor, send the data. But the system as a whole is something I'm proud of because it exists in the world, not just on a screen.

## Why It Matters

We spend so much of our lives building things that are invisible. There's value in making something you can hold, something that interacts with the physical world, something that beeps when you want it to beep.

That's the joy of physical computing.

## The Sensor Code

Highlights of the project:

- **Hardware timer interrupts** — precise sampling without blocking the main loop
- **Sensor data acquisition** — reading the environmental sensor on a schedule
- **WiFi data transmission** — pushing readings to a remote endpoint

The hardware timer is configured like this:

```c
void setup_timer() {
  timer_config_t config = {
    .alarm_en = TIMER_ALARM_EN,
    .counter_en = TIMER_COUNTER_EN,
    .intr_type = TIMER_INTR_LEVEL,
    .counter_dir = TIMER_COUNT_UP,
    .auto_reload = TIMER_AUTORELOAD_EN,
    .divider = 80  // 80 MHz / 80 = 1 MHz
  };

  timer_init(TIMER_GROUP_0, TIMER_0, &config);
  timer_set_alarm_value(TIMER_GROUP_0, TIMER_0, 1000000); // 1 sec
  timer_enable_intr(TIMER_GROUP_0, TIMER_0);
  timer_isr_register(TIMER_GROUP_0, TIMER_0, &timer_isr, NULL, 0, NULL);
  timer_start(TIMER_GROUP_0, TIMER_0);
}
```

And the data goes out over WiFi:

```c
void send_sensor_data(float value) {
  HTTPClient http;
  http.begin("https://api.example.com/sensor");

  char payload[128];
  snprintf(payload, sizeof(payload),
    "{\"sensor\": %.2f, \"timestamp\": %lu}",
    value, millis());

  http.addHeader("Content-Type", "application/json");
  int code = http.POST(payload);
  http.end();
}
```

## Further Reading

- [ESP32 Official Documentation](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/) — Official ESP32 development framework documentation
- [PlatformIO](https://platformio.org/) — Professional collaborative platform for embedded development
- [Making Things Talk](https://makethingsbook.com/) — Tom Igoe's book on networked physical computing
- [Adafruit Learning System](https://learn.adafruit.com/) — Excellent tutorials for hardware projects

## Related Projects

- [esp32OffboardTimerSensor](https://github.com/Je0Dev/esp32OffboardTimerSensor) — ESP32 offboard timer sensor — my first real hardware project