"""Periodic GPS location reporting over a GPRS/GPS shield.

Reads NMEA sentences from the serial-connected module when available;
otherwise reports a fixed placeholder location so the reporting cadence and
message format can be demonstrated without hardware.
"""
from __future__ import annotations

import time
from dataclasses import dataclass

try:
    import serial  # type: ignore

    _HAS_SERIAL = True
except ImportError:  # pragma: no cover
    _HAS_SERIAL = False

SERIAL_PORT = "/dev/serial0"
BAUD_RATE = 9600


@dataclass
class Location:
    latitude: float
    longitude: float
    timestamp: float


class GPSReporter:
    def __init__(self, report_interval_s: int = 300) -> None:
        self.report_interval_s = report_interval_s
        self._last_report_time = 0.0
        self._serial = None
        if _HAS_SERIAL:
            try:
                self._serial = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
            except Exception:
                self._serial = None

    def _read_location(self) -> Location:
        if self._serial is not None:
            # A real implementation parses $GPGGA/$GPRMC NMEA sentences here.
            line = self._serial.readline().decode("ascii", errors="ignore")
            parsed = self._parse_nmea(line)
            if parsed is not None:
                return parsed
        # Fallback placeholder location for development/demo without hardware.
        return Location(latitude=18.5204, longitude=73.8567, timestamp=time.time())

    @staticmethod
    def _parse_nmea(line: str) -> Location | None:
        # Left intentionally minimal: real NMEA parsing (e.g. via pynmea2)
        # would replace this in a hardware deployment.
        return None

    def maybe_report(self, send_fn) -> None:
        """Call send_fn(location) if the report interval has elapsed."""
        now = time.time()
        if now - self._last_report_time >= self.report_interval_s:
            location = self._read_location()
            send_fn(location)
            self._last_report_time = now


def send_location_sms(location: Location) -> None:
    """Placeholder for sending the location to a caregiver (SMS/HTTP)."""
    print(
        f"[gps] reporting location lat={location.latitude} "
        f"lon={location.longitude} at t={location.timestamp:.0f}"
    )
