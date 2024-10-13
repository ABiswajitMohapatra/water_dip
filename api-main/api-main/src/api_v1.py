""" API v1 Router for the application."""
# Third-party libraries imports
from typing import Union
from fastapi.responses import Response
from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import APIRouter, Depends, HTTPException


# Local modules
from schema import TaskId, Task, TaskUpdate, Tasks, TaskCreate,TaskBulkCreate,TaskBulkDelete
from models import Task as TaskModel
from db import get_session, init_db
from exceptions import AppException
from utils import is_valid_instance

# Create a router for the API
router = APIRouter(prefix="/v1", tags=["api"])

@router.get("/tasks")
async def read_tasks(db: AsyncSession = Depends(get_session)):
    """Get all tasks."""
    try:
        model_tasks = await db.execute(select(TaskModel))
        tasks = model_tasks.scalars().all()
        tasks_list = []
        for task in tasks:
            task_data = {
                "id": task.id,
                "title": task.title,
                "is_completed": task.is_completed
            }
            tasks_list.append(task_data)
        return {"tasks": tasks_list}
    except Exception as e:
        raise e

@router.post("/tasks", response_model=TaskId | list[TaskId])
async def create_task(task: Union[TaskCreate, TaskBulkCreate], db: AsyncSession = Depends(get_session)):
    """Create a new task."""
    try:
        if is_valid_instance(task, TaskCreate):
            task_model = TaskModel(title=task.title)
            db.add(task_model)
            await db.commit()
            await db.refresh(task_model)
            return task_model
        elif is_valid_instance(task, TaskBulkCreate):
            tasks = []
            for t in task.tasks:
                task_model = TaskModel(title=t.title)
                db.add(task_model)
                tasks.append(task_model)
            await db.commit()
            for task_model in tasks:
                await db.refresh(task_model)
            return Response(status_code=201, content=tasks)
        else:
            raise HTTPException(status_code=400, detail="Invalid request.")
    except Exception as e:
        await db.rollback()
        raise e

@router.get("/tasks/{task_id}", response_model=Task)
async def read_task(task_id: int, db: AsyncSession = Depends(get_session)):
    """Get a single task."""
    try:
        task = await db.execute(select(TaskModel).filter(TaskModel.id == task_id))
        task = task.scalars().first()
        if not task:
            raise AppException(status=404, message="There is no task at that id.")
        return task
    except Exception as e:
        raise e

@router.put("/tasks/{task_id}")
async def update_task(task_id: int, task: TaskUpdate, db: AsyncSession = Depends(get_session)):
    """Update a task."""
    try:
        result = await db.execute(select(TaskModel).filter(TaskModel.id == task_id))
        task_db = result.scalars().first()
        if not task:
            raise AppException(status=404, message="There is no task at that id.")
        task_db.title = task.title
        task_db.is_completed = task.is_completed
        await db.commit()
        await db.refresh(task_db)
        return Response(status_code=204)
    except Exception as e:
        await db.rollback()
        raise e

@router.delete("/tasks")
async def delete_tasks(task: TaskBulkDelete, db: AsyncSession = Depends(get_session)):
    """Delete multiple tasks."""
    try:
        result = await db.execute(delete(TaskModel).where(TaskModel.id.in_([t.id for t in task.tasks])))
        if result.rowcount == 0:
            raise AppException(status=404,message="There are no tasks at those ids.")
        await db.commit()
        return Response(status_code=204)
    except Exception as e:
        await db.rollback()
        raise e

@router.delete("/tasks/{task_id}")
async def delete_task(task_id: int | None, db: AsyncSession = Depends(get_session)):
    """Delete a task."""
    try:
            result = await db.execute(delete(TaskModel).where(TaskModel.id == task_id))
            if result.rowcount == 0:
                raise AppException(status=404,message="There are no tasks at those ids.")
            await db.commit()
            return Response(status_code=204)
    except Exception as e:
        await db.rollback()
        raise e




