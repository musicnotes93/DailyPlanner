import { useState, useEffect } from "react";
import "./styles.css";

function ToDoList() {
  const [isStriked, setIsStriked] = useState(false);
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleClick = () => {
    setIsStriked(!isStriked);
  };

  function handleChange(event) {
    let dateWeGet = event.target.value;
    let dateArray = dateWeGet.split("-");
    const newFormat = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
    setDate(newFormat);
  }

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="to-do-list">
      <h1>Daily Planner</h1>
      <div>
        <label>Choose Date:</label>
        <input type="date" onChange={handleChange} />
      </div>
      <div className="addTask">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <h2>{date}</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="listItem">
            <input type="checkbox" onClick={handleClick} />
            <span
              style={{ textDecoration: isStriked ? "line-through" : "none" }}
              className="text"
            >
              {task}
            </span>
            <button className="delete-button" onClick={() => deleteTask(index)}>
              Delete
            </button>
            <button className="move-button" onClick={() => moveTaskUp(index)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#705c53"
                viewBox="0 0 16 16"
              >
                <path d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708z" />
              </svg>
            </button>
            <button className="move-button" onClick={() => moveTaskDown(index)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#705c53"
                viewBox="0 0 16 16"
              >
                <path d="M4.854 14.854a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V3.5A2.5 2.5 0 0 1 6.5 1h8a.5.5 0 0 1 0 1h-8A1.5 1.5 0 0 0 5 3.5v9.793l3.146-3.147a.5.5 0 0 1 .708.708z" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;

