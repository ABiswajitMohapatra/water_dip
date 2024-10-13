"""This module defines the schema for the request and response models."""
# Third-party libraries imports
from pydantic import BaseModel

# Define the schema for the request and response models
class TaskId(BaseModel):
    """
    A model for getting a task by its ID.

    Attributes:
        task_id (int): The ID of the task to be retrieved.
    """
    id: int

class Task(BaseModel):
    """
    A response model that includes a single task.

    Inherits from:
        Response: The base response model.

    Attributes:
        task (dict): A single task represented as a dictionary.
    """
    id: int
    title: str
    is_completed: bool

    class Config:
        from_attributes = True

class Tasks(BaseModel):
    """
    A response model that includes a list of tasks.

    Inherits from:
        Response: The base response model.

    Attributes:
        tasks (list[dict]): A list of tasks, where each task is represented as a dictionary.
    """
    tasks: list[Task]

    # class Config:
    #     from_attributes = True

class TaskCreate(BaseModel):
    """
    A model for creating a new task.

    Attributes:
        title (str): The title of the task.
        is_completed (bool): A flag indicating whether the task is completed.
    """
    title: str

class TaskBulkCreate(BaseModel):
    """
    A model for bulk creating tasks.

    Attributes:
        tasks (list[TaskCreate]): A list of TaskCreate models representing the tasks to be created.
    """
    tasks: list[TaskCreate]

class TaskUpdate(BaseModel):
    """
    A model for updating an existing task.

    Attributes:
        title (str): The updated title of the task.
        is_completed (bool): The updated completion status of the task.
    """
    title: str
    is_completed: bool


class TaskBulkDelete(BaseModel):
    """
    A model for bulk deleting tasks.

    Attributes:
        tasks (list[__TaskId]): A list of __TaskId models representing the IDs of the tasks to be deleted.
    """
    tasks: list[TaskId]

