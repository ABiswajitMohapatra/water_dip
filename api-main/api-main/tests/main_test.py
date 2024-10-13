"""NOTE: The test cases are modified to not work statically but dynamically."""

import requests
import json

config = {}

def test_create_task():
    r = requests.post('http://localhost:8000/v1/tasks', json={"title": "My First Task"})
    config["task_id"] = r.json()["id"]
    assert isinstance(r.json()["id"], int)
    assert len(r.json()) == 1

def test_list_all_tasks():
    r = requests.get('http://localhost:8000/v1/tasks')
    assert isinstance(r.json()["tasks"], list)
    assert len(r.json()) == 1
    assert isinstance(r.json()["tasks"][0]["id"], int)
    assert isinstance(r.json()["tasks"][0]["title"], str)
    assert isinstance(r.json()["tasks"][0]["is_completed"], bool)
    assert len(r.json()["tasks"][0]) == 3

def test_get_task():
    r = requests.get(f'http://localhost:8000/v1/tasks/{config["task_id"]}')
    assert isinstance(r.json(),dict)
    assert isinstance(r.json()["id"], int)
    assert isinstance(r.json()["title"], str)
    assert isinstance(r.json()["is_completed"], bool)
    assert len(r.json()) == 3

def test_update_task():
    r = requests.put(f'http://localhost:8000/v1/tasks/{config["task_id"]}', json={"title": "My First Task", "is_completed": True})
    assert not r.content

def test_delete_task():
    r = requests.delete(f'http://localhost:8000/v1/tasks/{config["task_id"]}')
    assert not r.content
