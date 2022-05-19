// Define UI Vars
const taskContainer = document.querySelector(".task-container");
const addTaskButton = document.querySelector(".task-button");
const taskForm = document.querySelector(".task-form");
const taskTitle = document.querySelector(".task-form input:nth-child(1)");
const taskDate = document.querySelector(".task-form input:nth-child(2)");
const taskCategory = document.querySelector(".task-form select:nth-child(3)");
const taskPriority = document.querySelector(".task-form select:nth-child(4)");
const clearBtn = document.querySelector(".clear-task-btn");
const searchBar = document.querySelector(".top-menu input");
const selector = document.querySelector(".top-menu select");
let taskList;
let sortingList = [];
let tempList = [];

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    window.addEventListener("DOMContentLoaded", getTaskList);
    addTaskButton.addEventListener('click', showTaskForm);
    taskForm.addEventListener('submit', addTask);
    clearBtn.addEventListener('click', clearTaskList);
    taskContainer.addEventListener('click', deleteTask)
    searchBar.addEventListener('keyup', filterTask);
    selector.addEventListener('click', sortTasks);
}

// Event functions
function getTaskList(e) {
    if(localStorage.getItem("tasks") == null) {
        taskList = [];
    } else {
        document.querySelector(".task-container h5").style.display = "none";
        taskList = JSON.parse(localStorage.getItem("tasks"));
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
    let taskDetail = {
        title: taskTitle.value,
        date: taskDate.value,
        category: taskCategory.value,
        priority: taskPriority.value
    }

    const taskBox = document.createElement("div");
    taskBox.classList.add("task-box");
    taskContainer.appendChild(taskBox);
    
    taskList.push(taskDetail);
    localStorage.setItem("tasks",JSON.stringify(taskList));

    // Remove empty list header
    document.querySelector(".task-container h5").style.display = "none";
    // Task description vars
    const titleElement = document.createElement("p");
    const dateElement = document.createElement("p");
    const categoryElement = document.createElement("p");
    const priorityElement = document.createElement("p");
    // Add text to vars
    titleElement.textContent = taskDetail.title;
    dateElement.textContent = taskDetail.date;
    categoryElement.textContent = taskDetail.category;
    priorityElement.textContent = taskDetail.priority;
    //Add delete button
    deleteBtn = document.createElement("button");
    deleteBtn.type ="submit";
    deleteBtn.classList.add("delete-task-btn");
    // Append vars to task box
    taskBox.appendChild(titleElement);
    taskBox.appendChild(categoryElement);
    taskBox.appendChild(priorityElement);
    taskBox.appendChild(dateElement);
    taskBox.appendChild(deleteBtn);

    taskTitle.value = "Title";
    taskDate.value = "YYYY-MM-DD";
    taskCategory.value = "Category";
    taskPriority.value = "Priority";

    e.preventDefault();
}

// Delete individual tasks
function deleteTask(e) {
    if(e.target.classList.contains('delete-task-btn')) {
        taskContainer.removeChild(e.target.parentElement);
        // Remove from local storage
        taskList.forEach(function(task, index) {
            if(task.title == e.target.parentElement.firstElementChild.textContent) {
                taskList.splice(index, 1);
            }
        })

        localStorage.setItem("tasks", JSON.stringify(taskList));
    }
}

// Clear tasks
function clearTaskList(e) {
    localStorage.clear();
    window.location.reload();
}

// Search task
function filterTask(e) {
    let taskBoxList = document.querySelectorAll(".task-box");

    taskBoxList.forEach(function(task) {
        if(task.firstElementChild.textContent.toLowerCase()
            .indexOf(e.target.value.toLowerCase())) {
                task.style.display="none";
        } else {
            task.style.display="flex";
        }
    });
}

// Sort tasks
function sortTasks(e) {
    if(e.target.value == "Alphabetic") {
        sortByAlphabets();
    } else if(e.target.value == "Date") {
        sortByDate();
    } else if(e.target.value == "Priority") {
        sortByPriority();
    } else if(e.target.value == "Category") {
        sortByCategory();
    }
}

// Sort alphabetically 
function sortByAlphabets() {
    taskList.forEach(function(task) {
        sortingList.push(task.title);
    });

    sortingList.sort();
    sortingList.forEach(function(title) {
        taskList.forEach(function(task) {
            if(title == task.title) {
                tempList.push(task);
            }
        });
    });

    while(taskContainer.children[2]) {
        taskContainer.removeChild(taskContainer.children[2]);
    }

    taskList = tempList;
    tempList = [];
    sortingList = [];
    initTasks();
}

// Sort Date 
function sortByDate() {
    taskList.forEach(function(task) {
        sortingList.push(Date.parse(task.date));
    });

    sortingList.sort();
    sortingList.forEach(function(dateValue) {
        taskList.forEach(function(task) {
            if(dateValue == Date.parse(task.date)) {
                tempList.push(task);
            }
        });
    });

    while(taskContainer.children[2]) {
        taskContainer.removeChild(taskContainer.children[2]);
    }

    taskList = tempList;
    tempList = [];
    sortingList = [];
    initTasks();
}

// Sort Priority 
function sortByPriority() {

    // Sorting High priority tasks
    taskList.forEach(function(task) {
        if(task.priority == "High") {
            tempList.push(task);
        }
    });
    // Sorting Medium priority tasks
    taskList.forEach(function(task) {
        if(task.priority == "Medium") {
            tempList.push(task);
        }
    });
    // Sorting Low priority tasks
    taskList.forEach(function(task) {
        if(task.priority == "Low") {
            tempList.push(task);
        }
    });

    while(taskContainer.children[2]) {
        taskContainer.removeChild(taskContainer.children[2]);
    }

    taskList = tempList;
    tempList = [];
    initTasks();
}

// Sort Category 
function sortByCategory() {

    // Sorting Work category tasks
    taskList.forEach(function(task) {
        if(task.category == "Work") {
            tempList.push(task);
        }
    });
    // Sorting Work category tasks
    taskList.forEach(function(task) {
        if(task.category == "School") {
            tempList.push(task);
        }
    });
    // Sorting Work category tasks
    taskList.forEach(function(task) {
        if(task.category == "Grocery") {
            tempList.push(task);
        }
    });
    // Sorting Work category tasks
    taskList.forEach(function(task) {
        if(task.category == "Family") {
            tempList.push(task);
        }
    });
    // Sorting Friends category tasks
    taskList.forEach(function(task) {
        if(task.category == "Friends") {
            tempList.push(task);
        }
    });
    // Sorting Pet category tasks
    taskList.forEach(function(task) {
        if(task.category == "Pet") {
            tempList.push(task);
        }
    });
    

    while(taskContainer.children[2]) {
        taskContainer.removeChild(taskContainer.children[2]);
    }

    taskList = tempList;
    tempList = [];
    initTasks();
}

// Create task box
function initTasks() {
    taskList.forEach(function(task) {
        // Create task box
        const taskBox = document.createElement("div");
        taskBox.classList.add("task-box");
        taskContainer.appendChild(taskBox);
        // Task description vars
        const titleElement = document.createElement("p");
        const dateElement = document.createElement("p");
        const categoryElement = document.createElement("p");
        const priorityElement = document.createElement("p");
        // Add text to vars
        titleElement.textContent = task.title;
        dateElement.textContent = task.date;
        categoryElement.textContent = task.category;
        priorityElement.textContent = task.priority;
        //Add delete button
        deleteBtn = document.createElement("button");
        deleteBtn.type ="submit";
        deleteBtn.classList.add("delete-task-btn");
        // Append vars to task box
        taskBox.appendChild(titleElement);
        taskBox.appendChild(categoryElement);
        taskBox.appendChild(priorityElement);
        taskBox.appendChild(dateElement);
        taskBox.appendChild(deleteBtn);
    });
}