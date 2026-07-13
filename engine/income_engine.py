"""
income_engine.py

Predicts expected income, predicted income under current
conditions, and estimated income loss.
"""

from dataclasses import dataclass

from models import InputData, FeatureSet


@dataclass
class IncomePrediction:
    expected_income: float
    predicted_income: float
    income_loss: float


class IncomeEngine:
    """Predicts worker income."""

    AVERAGE_ORDER_VALUE = 120.0  # ₹

    @staticmethod
    def predict(
        input_data: InputData,
        features: FeatureSet,
        risk_score: float
    ) -> IncomePrediction:
        """
        Predict expected income and loss.
        """

        # =====================================
        # Step 1: Expected Income
        # =====================================

        expected_income = (
            input_data.demand.weekly_average *
            IncomeEngine.AVERAGE_ORDER_VALUE
        )

        # =====================================
        # Step 2: Risk Adjustment
        # =====================================

        adjustment_factor = max(
            0.0,
            1 - (risk_score / 100)
        )

        # =====================================
        # Step 3: Reliability Bonus
        # =====================================

        # Reliable workers recover
        # some of the lost income.

        adjustment_factor += (
            features.reliability * 0.10
        )

        adjustment_factor = min(
            adjustment_factor,
            1.0
        )

        # =====================================
        # Step 4: Predicted Income
        # =====================================

        predicted_income = (
            expected_income *
            adjustment_factor
        )

        # =====================================
        # Step 5: Income Loss
        # =====================================

        income_loss = max(
            0.0,
            expected_income - predicted_income
        )

        return IncomePrediction(
            expected_income=round(expected_income, 2),
            predicted_income=round(predicted_income, 2),
            income_loss=round(income_loss, 2)
        )
