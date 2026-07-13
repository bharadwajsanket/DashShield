"""
confidence.py

Calculates the confidence score for DASHCORE predictions.
"""

from models import InputData, FeatureSet


class ConfidenceEngine:
    """Calculates prediction confidence."""

    @staticmethod
    def calculate(
        input_data: InputData,
        features: FeatureSet
    ) -> float:
        """
        Returns confidence as a percentage (0–100).
        """

        # ==================================
        # 1. Data Completeness
        # ==================================

        total_fields = 14
        available_fields = 0

        values = [
            input_data.weather.rainfall,
            input_data.weather.humidity,
            input_data.weather.visibility,
            input_data.weather.temperature,

            input_data.demand.current_orders,
            input_data.demand.weekly_average,
            input_data.demand.monthly_average,

            input_data.worker.experience_years,
            input_data.worker.online_hours,
            input_data.worker.acceptance_rate,

            input_data.region.traffic_index,
            input_data.region.event_index,
            input_data.region.road_closure_index,

            input_data.time.hour
        ]

        for value in values:
            if value is not None:
                available_fields += 1

        data_completeness = available_fields / total_fields

        # ==================================
        # 2. Historical Consistency
        # ==================================
        #
        # Placeholder until historical
        # data becomes available.
        #

        historical_similarity = 0.85

        # ==================================
        # 3. Input Consistency
        # ==================================

        consistency = 1.0

        # Impossible acceptance rate

        if input_data.worker.acceptance_rate > 100:
            consistency -= 0.20

        # Impossible humidity

        if input_data.weather.humidity > 100:
            consistency -= 0.20

        # Negative orders

        if input_data.demand.current_orders < 0:
            consistency -= 0.30

        # Impossible hour

        if (
            input_data.time.hour < 0 or
            input_data.time.hour > 23
        ):
            consistency -= 0.30

        consistency = max(0.0, consistency)

        # ==================================
        # 4. Feature Stability
        # ==================================
        #
        # If every feature is either
        # extremely low or extremely high,
        # confidence is slightly reduced.
        #

        feature_values = [
            features.weather_risk,
            features.demand_risk,
            features.regional_risk,
            features.reliability,
            features.temporal_risk
        ]

        average = sum(feature_values) / len(feature_values)

        stability = 1 - abs(average - 0.5)

        stability *= 2

        stability = max(0.0, min(stability, 1.0))

        # ==================================
        # Final Confidence
        # ==================================

        confidence = (
            0.40 * data_completeness +
            0.30 * historical_similarity +
            0.20 * consistency +
            0.10 * stability
        )

        return round(confidence * 100, 2)
