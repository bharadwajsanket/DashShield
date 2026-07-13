"""
config.py

Central configuration values for DASHCORE.

Keeping all constants in one place makes the system
easy to tune without modifying engine logic.
"""


# ==================================================
# NORMALIZATION
# ==================================================

MAX_RAINFALL = 100.0          # mm/hr
MAX_VISIBILITY = 10.0         # km
MAX_EXPERIENCE = 10.0         # years
MAX_ONLINE_HOURS = 12.0       # hours


# ==================================================
# FEATURE WEIGHTS
# ==================================================

WEATHER_WEIGHT = 0.35
DEMAND_WEIGHT = 0.30
REGIONAL_WEIGHT = 0.20
RELIABILITY_WEIGHT = 0.15
TEMPORAL_WEIGHT = 0.10


# ==================================================
# WEATHER COMPONENT WEIGHTS
# ==================================================

RAIN_WEIGHT = 0.40
HUMIDITY_WEIGHT = 0.20
VISIBILITY_WEIGHT = 0.25
TEMPERATURE_WEIGHT = 0.15


# ==================================================
# DEMAND COMPONENT WEIGHTS
# ==================================================

WEEKLY_DEMAND_WEIGHT = 0.60
MONTHLY_DEMAND_WEIGHT = 0.40


# ==================================================
# RELIABILITY COMPONENT WEIGHTS
# ==================================================

EXPERIENCE_WEIGHT = 0.30
ONLINE_HOURS_WEIGHT = 0.30
ACCEPTANCE_WEIGHT = 0.40


# ==================================================
# REGIONAL COMPONENT WEIGHTS
# ==================================================

TRAFFIC_WEIGHT = 0.50
EVENT_WEIGHT = 0.20
ROAD_CLOSURE_WEIGHT = 0.30


# ==================================================
# PREMIUM SETTINGS
# ==================================================

BASE_PREMIUM = 30.0

COVERAGE_MULTIPLIERS = {
    "basic": 1.0,
    "standard": 1.5,
    "premium": 2.0,
}

MAX_RELIABILITY_DISCOUNT = 0.20


# ==================================================
# INCOME ENGINE
# ==================================================

AVERAGE_ORDER_VALUE = 120.0

RELIABILITY_RECOVERY_BONUS = 0.10


# ==================================================
# CLAIM SETTINGS
# ==================================================

MIN_RISK_SCORE = 60.0

MIN_CONFIDENCE = 70.0

MIN_ONLINE_HOURS = 6.0

MIN_LOSS_PERCENTAGE = 0.20

PAYOUT_PERCENTAGE = 0.90


# ==================================================
# CONFIDENCE WEIGHTS
# ==================================================

DATA_COMPLETENESS_WEIGHT = 0.40

HISTORICAL_SIMILARITY_WEIGHT = 0.30

CONSISTENCY_WEIGHT = 0.20

FEATURE_STABILITY_WEIGHT = 0.10


# ==================================================
# DEFAULT VALUES
# ==================================================

DEFAULT_HISTORICAL_SIMILARITY = 0.85


# ==================================================
# RISK LEVELS
# ==================================================

LOW_RISK = 30

MODERATE_RISK = 60

HIGH_RISK = 80'
