import React, { useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editIndex, setEditIndex] = useState(-1); // Store the index of the task being edited
  const [editedTaskText, setEditedTaskText] = useState(''); // Store the edited task text

  const addTask = () => {
    if (taskText.trim() === '') return;
    setTasks([...tasks, { text: taskText, editing: false }]);
    setTaskText('');
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const startEditing = (index, text) => {
    setEditIndex(index);
    setEditedTaskText(text); // Store the original text when starting to edit
    const updatedTasks = [...tasks];
    updatedTasks[index].editing = true;
    setTasks(updatedTasks);
  };

  const cancelEditing = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].editing = false;
    setTasks(updatedTasks);
    setEditIndex(-1); // Reset editIndex to -1 to stop editing
  };

  const saveTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    updatedTasks[index].editing = false;
    setTasks(updatedTasks);
    setEditIndex(-1); // Reset editIndex to -1 to stop editing
  };

  return (
    <div className="TaskList">
      <h4 className="task-list-title">
        <i className="bi-circle bi-circle-fill ms-2"></i>
        <span className="ms-3">Task List</span>
      </h4>
      <div className="input-group mb-3">
        <input
          id='taskId'
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <div className="input-group-append">
          <button className="bi-add bi-plus-lg fw-bold" type="button" onClick={addTask}></button>
        </div>
      </div>
      <div className="list-item">
        <div className="task-list-container">
          {tasks.map((task, index) => (
            <div className="list-group-item task-item" key={index}>
              <div className="task-content">
                {task.editing ? (
                  <div>
                    <input
                      id='editId'
                      type="text"
                      value={editedTaskText} // Use the editedTaskText for input value
                      onChange={(e) => setEditedTaskText(e.target.value)} // Update editedTaskText
                    />
                    <button
                      className="bi-save bi-check-lg btn-sm text-success"
                      onClick={() => saveTask(index, editedTaskText)} // Save editedTaskText
                    ></button>
                    <button
                      className="bi-cancel bi-x-lg btn-sm text-danger"
                      onClick={() => cancelEditing(index)}
                    ></button>
                  </div>
                ) : (
                  <div>
                    <span>{task.text}</span>
                    <button
                      className="bi-edit bi-pencil-square btn-sm"
                      onClick={() => startEditing(index, task.text)} // Pass the original text
                    ></button>
                    <button
                      className="bi-delete bi-trash3-fill btn-sm"
                      onClick={() => deleteTask(index)}
                    ></button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
