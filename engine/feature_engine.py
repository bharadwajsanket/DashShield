"""
feature_engine.py

Converts raw input data into engineered features
used by the DASHCORE Risk Engine.
"""

from models import InputData, FeatureSet
from normalizer import Normalizer


class FeatureEngine:
    """Extracts normalized risk features from raw input."""

    @staticmethod
    def extract(input_data: InputData) -> FeatureSet:

        # ==========================
        # WEATHER RISK
        # ==========================

        rainfall = Normalizer.percentage(input_data.weather.rainfall)
        humidity = Normalizer.percentage(input_data.weather.humidity)
        visibility = Normalizer.visibility_risk(
            input_data.weather.visibility
        )
        temperature = Normalizer.temperature_risk(
            input_data.weather.temperature
        )

        weather_risk = (
            0.40 * rainfall +
            0.20 * humidity +
            0.25 * visibility +
            0.15 * temperature
        )

        # ==========================
        # DEMAND RISK
        # ==========================

        weekly_gap = Normalizer.inverse_ratio(
            input_data.demand.current_orders,
            input_data.demand.weekly_average
        )

        monthly_gap = Normalizer.inverse_ratio(
            input_data.demand.current_orders,
            input_data.demand.monthly_average
        )

        demand_risk = (
            0.60 * weekly_gap +
            0.40 * monthly_gap
        )

        # ==========================
        # WORKER RELIABILITY
        # ==========================

        experience = Normalizer.min_max(
            input_data.worker.experience_years,
            0,
            10
        )

        online_hours = Normalizer.min_max(
            input_data.worker.online_hours,
            0,
            12
        )

        acceptance = Normalizer.percentage(
            input_data.worker.acceptance_rate
        )

        reliability = (
            0.30 * experience +
            0.30 * online_hours +
            0.40 * acceptance
        )

        # ==========================
        # REGIONAL RISK
        # ==========================

        traffic = Normalizer.percentage(
            input_data.region.traffic_index
        )

        events = Normalizer.percentage(
            input_data.region.event_index
        )

        road_closure = Normalizer.percentage(
            input_data.region.road_closure_index
        )

        regional_risk = (
            0.50 * traffic +
            0.20 * events +
            0.30 * road_closure
        )

        # ==========================
        # TEMPORAL RISK
        # ==========================

        temporal_risk = 0.0

        hour = input_data.time.hour

        # Late night hours
        if hour < 6:
            temporal_risk += 0.30

        # Peak traffic hours
        elif 17 <= hour <= 20:
            temporal_risk += 0.20

        # Holiday effect
        if input_data.time.is_holiday:
            temporal_risk += 0.20

        temporal_risk = Normalizer.clamp(temporal_risk)

        # ==========================
        # RETURN FEATURES
        # ==========================

        return FeatureSet(
            weather_risk=weather_risk,
            demand_risk=demand_risk,
            reliability=reliability,
            regional_risk=regional_risk,
            temporal_risk=temporal_risk
        )
      
