"""Configuration file for the project."""
import os

"""Application configuration settings."""

# Server Port
port = int(os.environ.get("PORT", 8000))

# Path to the SQLite database file
sqlalchemy_database_url = "sqlite+aiosqlite:///data/main.db"
