"""
normalizer.py

Provides utility functions to normalize raw input values into
a common 0–1 range for consistent risk calculations.
"""


class Normalizer:
    """Collection of static normalization methods."""

    @staticmethod
    def clamp(value: float, minimum: float = 0.0, maximum: float = 1.0) -> float:
        """
        Restrict a value within the given range.
        """
        return max(minimum, min(value, maximum))

    @staticmethod
    def min_max(value: float, minimum: float, maximum: float) -> float:
        """
        Performs Min-Max normalization.

        Formula:
            (value - minimum) / (maximum - minimum)

        Returns a value between 0 and 1.
        """

        if maximum == minimum:
            return 0.0

        normalized = (value - minimum) / (maximum - minimum)
        return Normalizer.clamp(normalized)

    @staticmethod
    def percentage(value: float) -> float:
        """
        Converts a percentage (0–100) into 0–1.
        """

        return Normalizer.clamp(value / 100)

    @staticmethod
    def inverse_percentage(value: float) -> float:
        """
        Higher percentage should represent lower risk.

        Example:
            90% -> 0.10
            20% -> 0.80
        """

        return 1 - Normalizer.percentage(value)

    @staticmethod
    def ratio(current: float, reference: float) -> float:
        """
        Computes current/reference.

        Used for demand comparison.
        """

        if reference <= 0:
            return 0.0

        return current / reference

    @staticmethod
    def inverse_ratio(current: float, reference: float) -> float:
        """
        Converts a ratio into a risk score.

        Example:
            Current Orders = 40
            Weekly Average = 100

            ratio = 0.40
            risk = 0.60
        """

        return 1 - Normalizer.clamp(
            Normalizer.ratio(current, reference)
        )

    @staticmethod
    def visibility_risk(visibility: float) -> float:
        """
        Converts visibility (km) into a risk value.

        Assumptions:
            10 km or more = no risk
            0 km = maximum risk
        """

        return 1 - Normalizer.min_max(visibility, 0, 10)

    @staticmethod
    def temperature_risk(temp: float) -> float:
        """
        Estimates weather discomfort.

        Comfortable temperature:
            20°C–30°C

        Temperatures outside this range
        gradually increase risk.
        """

        if 20 <= temp <= 30:
            return 0.0

        if temp < 20:
            return Normalizer.min_max(20 - temp, 0, 20)

        return Normalizer.min_max(temp - 30, 0, 20)
