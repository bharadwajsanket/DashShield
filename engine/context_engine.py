"""
context_engine.py

Applies contextual interaction rules to the extracted features.
This captures real-world situations where multiple conditions
combine to increase or decrease overall risk.
"""

from dataclasses import dataclass

from models import FeatureSet


@dataclass
class ContextResult:
    interaction_bonus: float
    reasons: list


class ContextEngine:
    """Applies interaction rules between features."""

    @staticmethod
    def evaluate(features: FeatureSet) -> ContextResult:

        bonus = 0.0
        reasons = []

        # ============================================
        # Heavy Rain + Low Demand
        # ============================================

        if (
            features.weather_risk >= 0.70 and
            features.demand_risk >= 0.60
        ):
            bonus += 0.10
            reasons.append(
                "Heavy rainfall combined with low demand."
            )

        # ============================================
        # Heavy Traffic + Poor Visibility
        # ============================================

        if (
            features.regional_risk >= 0.70 and
            features.weather_risk >= 0.60
        ):
            bonus += 0.08
            reasons.append(
                "Traffic congestion amplified by poor weather."
            )

        # ============================================
        # Holiday + High Demand
        # Good demand reduces risk.
        # ============================================

        if (
            features.temporal_risk >= 0.20 and
            features.demand_risk <= 0.30
        ):
            bonus -= 0.05
            reasons.append(
                "Holiday demand offsets operational risk."
            )

        # ============================================
        # Reliable Worker
        # Reliability reduces overall disruption risk.
        # ============================================

        if features.reliability >= 0.85:
            bonus -= 0.07
            reasons.append(
                "Experienced and reliable worker."
            )

        # ============================================
        # Very Unreliable Worker
        # ============================================

        if features.reliability <= 0.40:
            bonus += 0.08
            reasons.append(
                "Low worker reliability."
            )

        # ============================================
        # Extremely Severe Conditions
        # ============================================

        if (
            features.weather_risk >= 0.85 and
            features.regional_risk >= 0.80 and
            features.demand_risk >= 0.70
        ):
            bonus += 0.15
            reasons.append(
                "Multiple severe disruption indicators detected."
            )

        return ContextResult(
            interaction_bonus=bonus,
            reasons=reasons
        )
      
