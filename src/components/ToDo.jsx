import React, { useState, useEffect } from "react";
import './Todo.css';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle input for new task
  function handleInput(e) {
    setNewTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((T) => [...T, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    let updateTask = tasks.filter((_, i) => i !== index);
    setTasks(updateTask);
  }

  function moveUp(index) {
    if (index > 0) {
      let updateTask = [...tasks];
      const temp = updateTask[index];
      updateTask[index] = updateTask[index - 1];
      updateTask[index - 1] = temp;
      setTasks(updateTask);
    }
  }

  function moveDown(index) {
    if (index < tasks.length - 1) {
      let updateTask = [...tasks];
      const temp = updateTask[index];
      updateTask[index] = updateTask[index + 1];
      updateTask[index + 1] = temp;
      setTasks(updateTask);
    }
  }

  function editTask(index) {
    setEditingIndex(index);
    setEditedTask(tasks[index]);
  }

  function handleEditInput(e) {
    setEditedTask(e.target.value);
  }

  function saveTask(index) {
    let updatedTasks = [...tasks];
    updatedTasks[index] = editedTask;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditedTask("");
  }

  return (
    <div className="container my-5">
      <h1>ToDo App</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task"
          value={newTask}
          onChange={handleInput}
        />
        <button className="btn-container bg-success text-black btn" id="basic-addon2" onClick={addTask}>
          Add tasks
        </button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={handleEditInput}
                />
                <button onClick={() => saveTask(index)}>Save</button>
              </>
            ) : (
              <>
                <span>{task}</span>
                <button onClick={() => deleteTask(index)}><i className="bi bi-trash"></i></button>
                <button onClick={() => moveUp(index)}><i className="bi bi-arrow-up"></i></button>
                <button onClick={() => moveDown(index)}><i className="bi bi-arrow-down"></i></button>
                <button onClick={() => editTask(index)}><i className="bi bi-pen-fill"></i></button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
