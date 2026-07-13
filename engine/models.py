"""
models.py

Defines the data models used across DASHCORE.
"""

from dataclasses import dataclass, field
from typing import List


# ==========================
# INPUT DATA
# ==========================

@dataclass
class WeatherData:
    rainfall: float          # mm/hr
    humidity: float          # %
    visibility: float        # km
    temperature: float       # °C


@dataclass
class DemandData:
    current_orders: float
    weekly_average: float
    monthly_average: float


@dataclass
class WorkerProfile:
    experience_years: float
    online_hours: float
    acceptance_rate: float   # 0–100


@dataclass
class TimeData:
    hour: int
    weekday: int             # 0=Monday
    is_holiday: bool


@dataclass
class RegionalData:
    traffic_index: float     # 0–100
    event_index: float       # 0–100
    road_closure_index: float  # 0–100


# ==========================
# COMPLETE INPUT
# ==========================

@dataclass
class InputData:
    weather: WeatherData
    demand: DemandData
    worker: WorkerProfile
    time: TimeData
    region: RegionalData


# ==========================
# FEATURE OUTPUT
# ==========================

@dataclass
class FeatureSet:
    weather_risk: float = 0.0
    demand_risk: float = 0.0
    reliability: float = 0.0
    regional_risk: float = 0.0
    temporal_risk: float = 0.0


# ==========================
# FINAL ENGINE OUTPUT
# ==========================

@dataclass
class DecisionOutput:
    risk_score: float
    confidence: float
    premium: float
    expected_income: float
    predicted_income: float
    income_loss: float
    payout: float
    claim_status: str
    explanation: List[str] = field(default_factory=list)
