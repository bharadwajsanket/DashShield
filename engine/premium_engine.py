"""
premium_engine.py

Calculates the dynamic insurance premium.
"""

from models import FeatureSet


class PremiumEngine:
    """Calculates premium based on risk and worker reliability."""

    BASE_PREMIUM = 30.0

    COVERAGE_MULTIPLIERS = {
        "basic": 1.0,
        "standard": 1.5,
        "premium": 2.0
    }

    @staticmethod
    def calculate(
        risk_score: float,
        features: FeatureSet,
        coverage: str = "standard"
    ) -> float:
        """
        Returns the recommended premium amount.
        """

        # -------------------------------
        # Coverage Multiplier
        # -------------------------------

        coverage_multiplier = PremiumEngine.COVERAGE_MULTIPLIERS.get(
            coverage.lower(),
            1.5
        )

        # -------------------------------
        # Risk Factor
        # -------------------------------

        risk_factor = 1 + (risk_score / 100)

        # -------------------------------
        # Reliability Discount
        # -------------------------------

        # Reliability ranges from 0–1.
        # Highly reliable workers receive up to 20% discount.

        reliability_discount = (
            1 - (features.reliability * 0.20)
        )

        # -------------------------------
        # Premium Calculation
        # -------------------------------

        premium = (
            PremiumEngine.BASE_PREMIUM *
            risk_factor *
            coverage_multiplier *
            reliability_discount
        )

        return round(premium, 2)
