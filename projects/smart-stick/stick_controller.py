"""Main control loop for the Assistive IoT Smart Stick.

Continuously polls the ultrasonic sensor and translates obstacle distance
into vibration/audio feedback intensity, while periodically reporting GPS
location to a caregiver endpoint.
"""
from __future__ import annotations

import time

from gps_reporter import GPSReporter, send_location_sms
from sensors import UltrasonicSensor

# Distance thresholds (cm) mapped to feedback urgency.
NEAR_CM = 50
CAUTION_CM = 150
POLL_INTERVAL_S = 0.2


def feedback_for_distance(distance_cm: float) -> str:
    if distance_cm <= NEAR_CM:
        return "URGENT"  # fast vibration pulses / high-pitched tone
    if distance_cm <= CAUTION_CM:
        return "CAUTION"  # moderate feedback
    return "CLEAR"  # no feedback needed


def dispatch_feedback(level: str, distance_cm: float) -> None:
    """Placeholder for driving the vibration motor / audio buzzer."""
    if level == "CLEAR":
        return
    print(f"[feedback] {level}: obstacle at {distance_cm} cm")


def run() -> None:
    sensor = UltrasonicSensor()
    gps = GPSReporter(report_interval_s=300)

    try:
        while True:
            distance = sensor.read_distance_cm()
            level = feedback_for_distance(distance)
            dispatch_feedback(level, distance)
            gps.maybe_report(send_location_sms)
            time.sleep(POLL_INTERVAL_S)
    except KeyboardInterrupt:
        pass
    finally:
        sensor.close()


if __name__ == "__main__":
    run()
