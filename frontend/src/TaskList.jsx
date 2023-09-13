import React, { useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (taskText.trim() === '') return;
    setTasks([...tasks, taskText]);
    setTaskText('');
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newText;
    setTasks(updatedTasks);
  };

  return (
    <div className="TaskList">
      <h4>Task List</h4>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <div className="input-group-append">
          <button className="bi-add bi-plus-lg" type="button" onClick={addTask}></button>
        </div>
      </div>
      <div className="list-item">
        {tasks.map((task, index) => (
          <div className="list-group-item task-item" key={index}>
            <span>{task}</span>
            <button
              className="bi-edit bi-pencil-square btn-sm"
              onClick={() => {
                const newText = prompt('Edit Task', task);
                if (newText !== null) editTask(index, newText);
              }}
            ></button>
            <button
              className="bi-delete bi-trash3-fill btn-sm"
              onClick={() => deleteTask(index)}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;


