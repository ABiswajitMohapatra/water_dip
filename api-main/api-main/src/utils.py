"""Utilities for the project."""

# Third-party imports
from pydantic import BaseModel, ValidationError


def is_valid_instance(data, model):
    if isinstance(data, model):
        print(data.dict())
        return True
    return False