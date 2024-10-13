"""Entry point for the main application."""
# Standard library imports
import sys
import os
from contextlib import asynccontextmanager

# Add the parent directory of the current file to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + '/../')

# Third-party libraries imports
from fastapi.responses import JSONResponse
import uvicorn
from fastapi import FastAPI

# Local modules
from config import port
from api_v1 import router, init_db
from exceptions import AppException

@asynccontextmanager
async def life_span(app: FastAPI):
    """Life span of the application."""
    await init_db()
    yield

# FastAPI application instance
app = FastAPI(lifespan=life_span)

@app.exception_handler(AppException)
async def app_exception_handler(request, exc):
    """Exception handler for AppException"""
    return JSONResponse(
        content={"error": exc.message}
    )

app.include_router(router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=port)

