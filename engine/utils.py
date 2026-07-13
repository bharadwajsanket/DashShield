"""
utils.py

Common utility functions used throughout DASHCORE.
"""

import json
from dataclasses import asdict, is_dataclass
from typing import Any


class Utils:
    """Common helper methods."""

    @staticmethod
    def clamp(value: float,
              minimum: float = 0.0,
              maximum: float = 1.0) -> float:
        """
        Restrict a value to the given range.
        """
        return max(minimum, min(value, maximum))

    @staticmethod
    def safe_divide(
        numerator: float,
        denominator: float,
        default: float = 0.0
    ) -> float:
        """
        Safely divide two numbers.
        """

        if denominator == 0:
            return default

        return numerator / denominator

    @staticmethod
    def round2(value: float) -> float:
        """
        Round to two decimal places.
        """

        return round(value, 2)

    @staticmethod
    def percentage(value: float) -> str:
        """
        Convert decimal to percentage string.

        Example:
            0.82 -> '82.00%'
        """

        return f"{value * 100:.2f}%"

    @staticmethod
    def currency(value: float) -> str:
        """
        Format currency.

        Example:
            1250 -> ₹1,250.00
        """

        return f"₹{value:,.2f}"

    @staticmethod
    def serialize(obj: Any) -> dict:
        """
        Convert dataclass objects into dictionaries.
        """

        if is_dataclass(obj):
            return asdict(obj)

        return obj

    @staticmethod
    def to_json(obj: Any, indent: int = 4) -> str:
        """
        Convert object to JSON.
        """

        if is_dataclass(obj):
            obj = asdict(obj)

        return json.dumps(obj, indent=indent)

    @staticmethod
    def risk_level(score: float) -> str:
        """
        Convert risk score to category.
        """

        if score < 30:
            return "Low"

        if score < 60:
            return "Moderate"

        if score < 80:
            return "High"

        return "Critical"

    @staticmethod
    def print_header(title: str):
        """
        Pretty console output.
        """

        line = "=" * 50

        print()
        print(line)
        print(title)
        print(line)
