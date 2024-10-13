"""Application models."""

# Standard library imports
from datetime import datetime

# Third-party libraries imports
from sqlalchemy import Boolean, Column, Integer, String, DateTime

# Local modules
from db import Base

class Task(Base):
    """A model representing a task."""
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
