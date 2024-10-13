"""Database module for the application."""
# Standard library imports
from typing import AsyncGenerator
from contextlib import asynccontextmanager
import os

# Third-party libraries imports
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Local modules
from config import sqlalchemy_database_url

# Define the absolute path to the database file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URL = f"sqlite+aiosqlite:///{os.path.join(BASE_DIR, '../', "data.db")}"

# Create the async database engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create a session maker
AsyncSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=AsyncSession
)

# Create a base class for the database models
Base = declarative_base()

async def init_db() -> None:
    async with engine.begin() as conn:
        # Create the tables
        await conn.run_sync(Base.metadata.create_all)

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """Get a new asynchronous database session."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()