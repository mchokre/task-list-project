// Define UI Vars
const taskContainer = document.querySelector(".task-container");
const addTaskButton = document.querySelector(".task-button");
const taskForm = document.querySelector(".task-form");
const taskTitle = document.querySelector(".task-form input:nth-child(1)");
const taskDate = document.querySelector(".task-form input:nth-child(2)");
const taskCategory = document.querySelector(".task-form select:nth-child(3)");
const taskPriority = document.querySelector(".task-form select:nth-child(4)");
let taskList;

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    window.addEventListener("DOMContentLoaded", getTaskList);
    addTaskButton.addEventListener('click', showTaskForm);
    taskForm.addEventListener('submit', addTask);
}

// Event functions
function getTaskList(e) {
    if(localStorage.getItem("tasks") == null) {
        taskList = [];
    } else {
        taskList = JSON.parse(localStorage.getItem("tasks"));
        initTaskMenuOptions();
        initTasks();
    }
}

function showTaskForm(e) {
    if(taskForm.style.display == "flex") {
        taskForm.style.display = "none"
        addTaskButton.style.backgroundImage = "url(images/plus.png)";
    } else {
        taskForm.style.display = "flex";
        addTaskButton.style.backgroundImage = "url(images/cancel.png)";
    }
}

function addTask(e) {
    const title = taskTitle.value;
    const date = taskDate.value;
    const  category = taskCategory.value;
    const priority = taskPriority.value;

    let taskDetail = {
        title: title,
        date: date,
        category: category,
        priority: priority
    }

    const taskBox = document.createElement("div");
    taskBox.classList.add("task-box");
    taskContainer.appendChild(taskBox);
    
    taskList.push(taskDetail);
    localStorage.setItem("tasks",JSON.stringify(taskList));

    taskTitle.value = "Title";
    taskDate.value = "Date";
    taskCategory.value = "Category";
    taskPriority.value = "Priority";

    e.preventDefault();
}

// Create task box
function initTasks() {
        taskList.forEach(function(task) {
        const taskBox = document.createElement("div");
        taskBox.classList.add("task-box");
        taskContainer.appendChild(taskBox);
    });
}

// Create top menu options
function initTaskMenuOptions() {
    document.querySelector(".top-menu h5:nth-child(1)").style.display = "none";
}