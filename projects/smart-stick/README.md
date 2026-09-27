# Assistive IoT Smart Stick

Final-year academic project (guided by Prof. J. Y. Kapadnis): an IoT-enabled
walking stick for visually impaired users. Combines ultrasonic obstacle
detection with vibration/audio feedback and periodic GPS location reporting,
running on a Raspberry Pi.

## Problem

Roughly 90% of blind individuals cannot travel independently, and only a
small fraction rely on a cane (~7%) or guide dog (~3%). A cane alone gives no
advance warning of obstacles and no way for family to know the user's
location. This project explores closing both gaps with low-cost, on-device
sensing and connectivity.

## Architecture

```
                     ┌─────────────────────────────┐
                     │        Raspberry Pi 3        │
                     │   (ARM Cortex-A53, 1GB RAM)  │
                     │                               │
   Ultrasonic ──────►│  sensors.py                   │
   sensor (HC-SR04)  │   - reads distance (cm)       │
                     │   - debounced polling loop    │
                     │        │                       │
                     │        ▼                       │
                     │  stick_controller.py           │
                     │   - obstacle-proximity logic   │
                     │   - feedback dispatch          │──► Vibration motor
                     │        │                       │──► Earphone / buzzer
                     │        ▼                       │      (audio alert)
                     │  gps_reporter.py               │
                     │   - reads GPS/GPRS module      │
                     │   - sends location on interval │
                     └────────────│──────────────────┘
                                  ▼
                         SMS / HTTP endpoint
                         (family / caregiver)
```

Control flow: `sensors.py` polls the ultrasonic sensor continuously;
`stick_controller.py` is the main loop that decides feedback intensity based
on how close an obstacle is (closer = faster vibration pulses / higher-pitched
tone) and, on a fixed interval, asks `gps_reporter.py` to push the current
location out over the GPRS module.

## Hardware

- Raspberry Pi 3 Model B
- HC-SR04 ultrasonic distance sensor
- Vibration motor + small buzzer (or earphone jack for audio cues)
- GPS/GPRS shield (SIM-based location + SMS)

## Repository layout

```
smart-stick/
├── README.md
├── requirements.txt
├── sensors.py            # ultrasonic sensor interface (GPIO)
├── stick_controller.py   # main loop: sensing -> feedback logic
└── gps_reporter.py       # GPS read + periodic location send
```

## Running it

```bash
pip install -r requirements.txt
python stick_controller.py
```

Requires a Raspberry Pi with the sensor wired to the GPIO pins configured at
the top of `sensors.py`. On non-Pi hardware, `sensors.py` falls back to a
simulated distance reading so the control logic can be exercised without
physical hardware.

## Status

This code is a clean re-expression of the original 2016/17 academic project's
design (see the project write-up on the portfolio site) — restructured into
readable modules rather than the original monolithic script, for
demonstration purposes.
