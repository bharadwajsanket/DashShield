"""
claims_engine.py

Determines claim eligibility and recommended payout.
"""

from dataclasses import dataclass


@dataclass
class ClaimDecision:
    status: str
    payout: float
    reason: str


class ClaimsEngine:
    """Evaluates insurance claims."""

    # Configuration
    MIN_RISK_SCORE = 60.0
    MIN_CONFIDENCE = 70.0
    MIN_ONLINE_HOURS = 6.0
    MIN_LOSS_PERCENTAGE = 0.20
    PAYOUT_PERCENTAGE = 0.90

    @staticmethod
    def evaluate(
        expected_income: float,
        actual_income: float,
        risk_score: float,
        confidence: float,
        online_hours: float,
        context_verified: bool = True
    ) -> ClaimDecision:
        """
        Evaluate claim eligibility.
        """

        # -----------------------------------
        # Income Loss
        # -----------------------------------

        income_loss = max(
            0.0,
            expected_income - actual_income
        )

        if expected_income == 0:
            loss_percentage = 0
        else:
            loss_percentage = (
                income_loss / expected_income
            )

        # -----------------------------------
        # Context Verification
        # -----------------------------------

        if not context_verified:
            return ClaimDecision(
                status="Rejected",
                payout=0.0,
                reason="Context verification failed."
            )

        # -----------------------------------
        # Participation Check
        # -----------------------------------

        if online_hours < ClaimsEngine.MIN_ONLINE_HOURS:
            return ClaimDecision(
                status="Rejected",
                payout=0.0,
                reason="Insufficient online participation."
            )

        # -----------------------------------
        # Risk Threshold
        # -----------------------------------

        if risk_score < ClaimsEngine.MIN_RISK_SCORE:
            return ClaimDecision(
                status="Rejected",
                payout=0.0,
                reason="Risk score below claim threshold."
            )

        # -----------------------------------
        # Loss Threshold
        # -----------------------------------

        if loss_percentage < ClaimsEngine.MIN_LOSS_PERCENTAGE:
            return ClaimDecision(
                status="Rejected",
                payout=0.0,
                reason="Income loss below minimum threshold."
            )

        # -----------------------------------
        # Confidence Check
        # -----------------------------------

        if confidence < ClaimsEngine.MIN_CONFIDENCE:
            return ClaimDecision(
                status="Manual Review",
                payout=0.0,
                reason="Prediction confidence is low."
            )

        # -----------------------------------
        # Approved
        # -----------------------------------

        payout = (
            income_loss *
            ClaimsEngine.PAYOUT_PERCENTAGE
        )

        return ClaimDecision(
            status="Approved",
            payout=round(payout, 2),
            reason="Claim satisfies all eligibility criteria."
        )
