document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">X</button>
    `;

    taskList.appendChild(li);
    taskInput.value = "";

    saveTasks();
}

// Function to delete a task
function deleteTask(event) {
    if (event.target.classList.contains("delete-btn")) {
        event.target.parentElement.remove();
        saveTasks();
    }
}

// Function to mark a task as completed
function toggleTask(event) {
    if (event.target.tagName === "SPAN") {
        event.target.classList.toggle("completed");
        saveTasks();
    }
}

// Save tasks in Local Storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from Local Storage
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        JSON.parse(savedTasks).forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button class="delete-btn">X</button>
            `;
            taskList.appendChild(li);
        });
    }
}

// Event Listeners
addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", toggleTask);
