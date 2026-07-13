"""
risk_engine.py

Calculates the final DASHCORE risk score (0–100).
"""

from models import FeatureSet
from context_engine import ContextResult


class RiskEngine:
    """Calculates the overall disruption risk."""

    # Feature weights
    WEATHER_WEIGHT = 0.35
    DEMAND_WEIGHT = 0.30
    REGIONAL_WEIGHT = 0.20
    RELIABILITY_WEIGHT = 0.15

    @staticmethod
    def calculate(
        features: FeatureSet,
        context: ContextResult
    ) -> float:
        """
        Returns a risk score between 0 and 100.
        """

        # ===============================
        # Base Weighted Risk
        # ===============================

        base_risk = (
            RiskEngine.WEATHER_WEIGHT * features.weather_risk +
            RiskEngine.DEMAND_WEIGHT * features.demand_risk +
            RiskEngine.REGIONAL_WEIGHT * features.regional_risk +
            RiskEngine.RELIABILITY_WEIGHT * (1 - features.reliability)
        )

        # Temporal adjustment
        base_risk += 0.10 * features.temporal_risk

        # Context interactions
        base_risk += context.interaction_bonus

        # Clamp between 0 and 1
        base_risk = max(0.0, min(1.0, base_risk))

        # Convert to percentage
        risk_score = round(base_risk * 100, 2)

        return risk_score
