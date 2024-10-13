"""Custom exceptions for the application"""

class AppException(Exception):
    """Base exception for the application"""
    def __init__(self ,status: int, message: str):
        self.status = status
        self.message = message