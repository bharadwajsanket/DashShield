"""
explainability.py

Generates human-readable explanations for DASHCORE decisions.
"""

from typing import List

from models import FeatureSet
from context_engine import ContextResult
from claims_engine import ClaimDecision


class ExplainabilityEngine:
    """Produces explanations for DASHCORE outputs."""

    @staticmethod
    def generate(
        features: FeatureSet,
        risk_score: float,
        confidence: float,
        premium: float,
        claim: ClaimDecision,
        context: ContextResult
    ) -> List[str]:

        explanations = []

        # ======================================
        # Risk Level
        # ======================================

        if risk_score >= 80:
            explanations.append(
                "Overall disruption risk is classified as CRITICAL."
            )

        elif risk_score >= 60:
            explanations.append(
                "Overall disruption risk is HIGH."
            )

        elif risk_score >= 30:
            explanations.append(
                "Overall disruption risk is MODERATE."
            )

        else:
            explanations.append(
                "Overall disruption risk is LOW."
            )

        # ======================================
        # Major Contributors
        # ======================================

        contributors = {
            "Weather Conditions": features.weather_risk,
            "Demand Conditions": features.demand_risk,
            "Regional Conditions": features.regional_risk,
            "Worker Reliability": 1 - features.reliability,
            "Time-Based Factors": features.temporal_risk,
        }

        ranked = sorted(
            contributors.items(),
            key=lambda item: item[1],
            reverse=True
        )

        explanations.append(
            "Top contributing factors:"
        )

        for name, score in ranked[:3]:
            explanations.append(
                f"- {name}: {score:.2f}"
            )

        # ======================================
        # Context Rules
        # ======================================

        if context.reasons:
            explanations.append(
                "Context interactions detected:"
            )

            for reason in context.reasons:
                explanations.append(
                    f"- {reason}"
                )

        # ======================================
        # Confidence
        # ======================================

        explanations.append(
            f"Prediction confidence: {confidence:.2f}%."
        )

        # ======================================
        # Premium
        # ======================================

        explanations.append(
            f"Recommended premium: ₹{premium:.2f}."
        )

        # ======================================
        # Claim Decision
        # ======================================

        explanations.append(
            f"Claim Status: {claim.status}."
        )

        explanations.append(
            f"Reason: {claim.reason}"
        )

        if claim.status == "Approved":
            explanations.append(
                f"Recommended payout: ₹{claim.payout:.2f}."
            )

        return explanations
