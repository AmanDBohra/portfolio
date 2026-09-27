"""Ultrasonic distance sensor (HC-SR04) interface.

Falls back to a simulated reading when not running on a Raspberry Pi, so the
rest of the pipeline can be exercised on any machine.
"""
from __future__ import annotations

import random
import time

TRIG_PIN = 23
ECHO_PIN = 24
SPEED_OF_SOUND_CM_PER_S = 34300  # at ~20C

try:
    import RPi.GPIO as GPIO  # type: ignore

    _HAS_GPIO = True
except ImportError:  # pragma: no cover - non-Pi dev environment
    _HAS_GPIO = False


class UltrasonicSensor:
    def __init__(self, trig_pin: int = TRIG_PIN, echo_pin: int = ECHO_PIN) -> None:
        self.trig_pin = trig_pin
        self.echo_pin = echo_pin
        if _HAS_GPIO:
            GPIO.setmode(GPIO.BCM)
            GPIO.setup(self.trig_pin, GPIO.OUT)
            GPIO.setup(self.echo_pin, GPIO.IN)
            GPIO.output(self.trig_pin, False)
            time.sleep(0.5)

    def read_distance_cm(self) -> float:
        """Return distance to the nearest obstacle, in centimeters."""
        if not _HAS_GPIO:
            # Simulated obstacle distance for development off-device.
            return round(random.uniform(15, 300), 1)

        GPIO.output(self.trig_pin, True)
        time.sleep(0.00001)
        GPIO.output(self.trig_pin, False)

        start_time = time.time()
        stop_time = time.time()

        while GPIO.input(self.echo_pin) == 0:
            start_time = time.time()

        while GPIO.input(self.echo_pin) == 1:
            stop_time = time.time()

        elapsed = stop_time - start_time
        distance = (elapsed * SPEED_OF_SOUND_CM_PER_S) / 2
        return round(distance, 1)

    def close(self) -> None:
        if _HAS_GPIO:
            GPIO.cleanup()
