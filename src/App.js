import { useState, useEffect } from "react";
import "./styles.css";

function ToDoList() {
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [strikedTasks, setStrikedTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
    const storedDate = localStorage.getItem("selectedDate");
    if (storedDate) {
      setDate(storedDate);
    }
    setStrikedTasks(new Array(storedTasks.length).fill(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("selectedDate", date);
  }, [date]);



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
      setStrikedTasks((s) => [...s, false]);
      setNewTask("");
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    const updatedStrikes = strikedTasks.filter((_, i) => i !== index);
    setStrikedTasks(updatedStrikes);
  }

 

  function toggleStrike(index) {
    const updatedStrikes = [...strikedTasks];
    updatedStrikes[index] = !updatedStrikes[index]; 
    setStrikedTasks(updatedStrikes);
  }

  

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
      const updatedStrikes = [...strikedTasks];
      [updatedStrikes[index], updatedStrikes[index - 1]] = [
        updatedStrikes[index - 1],
        updatedStrikes[index],
      ];
      setStrikedTasks(updatedStrikes);
    
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
      const updatedStrikes = [...strikedTasks];
      [updatedStrikes[index], updatedStrikes[index + 1]] = [
        updatedStrikes[index + 1],
        updatedStrikes[index],
      ];
      setStrikedTasks(updatedStrikes);
    }
  }

  return (
    <div className="to-do-list">
      <h1>Daily Planner</h1>
      <div>
        <label>Choose Date: </label>
        <input type="date" onChange={handleChange} />
      </div>
      <div className="addTask">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <h2>{date}</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="listItem">
           
            <input type="checkbox" onClick={() => toggleStrike(index)} />
            <span
              style={{ textDecoration: strikedTasks[index] ? "line-through" : "none" }}
              className="text"
            >
              {task}
            </span>
            
            
            <button className="delete-button" onClick={() => deleteTask(index)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#705c53" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg>
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

