"use strict";

const input = document.querySelector(".todo__text");
const btn = document.querySelector(".todo__add");
const todoItems = document.querySelector(".todo__items");
const select = document.querySelector(".todo__options");

let arrTaskObjects =
  localStorage.getItem("todoItems") !== null
    ? JSON.parse(localStorage.getItem("todoItems"))
    : [];

let tasksId =
  localStorage.getItem("id") !== null ? +localStorage.getItem("id") : 0;

const renderTasks = (arrTaskObjects) => {
  todoItems.innerHTML = "";

  for (let taskObject of arrTaskObjects) {
    const task = document.createElement("li");
    task.classList.add(
      "todo__item",
      taskObject.completed ? "completed" : "active"
    );
    todoItems.append(task);
    const taskText = document.createElement("span");
    taskText.classList.add("todo__task");
    task.append(taskText);
    taskText.innerText = taskObject.value;
    task.dataset.id = taskObject.id;
    task.innerHTML += `
    <div class='todo__date'>${taskObject.date}</div>
    <span class="todo__action todo__action_complete"></span>`;
    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("todo__action", "todo__action_delete");
    task.append(deleteBtn);
  }
};
renderTasks(arrTaskObjects);

const selectTask = (event) => {
  event.preventDefault();
  select.value = "all";
  if (input.value.trim() !== "") {
    localStorage.setItem("id", tasksId);
    localStorage.setItem("todoItems", JSON.stringify(arrTaskObjects));
    const taskObject = {
      value: input.value,
      date: new Date().toLocaleString().slice(0, -3),
      completed: false,
      id: tasksId,
    };
    arrTaskObjects.push(taskObject);
    renderTasks(arrTaskObjects);
    tasksId++;
    input.value = "";
  }
};
btn.addEventListener("click", selectTask);

const getInputValue = (event) => {
  event.preventDefault();
  if (input.value.trim() !== "") {
    localStorage.setItem("id", tasksId);
    localStorage.setItem("todoItems", JSON.stringify(arrTaskObjects));

    const taskObjtect = {
      value: input.value,
      date: new Date().toLocaleString().slice(0, -3),
      completed: false,
      id: tasksId,
    };
    arrTaskObjects.push(taskObjtect);
    renderTasks(arrTaskObjects);
    tasksId++;

    input.value = "";
  }
};
btn.addEventListener("click", getInputValue);

const deleteTask = (task) => {
  arrTaskObjects = arrTaskObjects.filter(
    (taskObj) => taskObj.id !== +task.dataset.id
  );
  renderTasks(arrTaskObjects);
  localStorage.setItem("todoItems", JSON.stringify(arrTaskObjects));
};

const crossOutTask = (task) => {
  arrTaskObjects = arrTaskObjects.map((taskObject) =>
    taskObject.id === +task.dataset.id
      ? {
          value: taskObject.value,
          date: taskObject.date,
          completed: !taskObject.completed,
          id: taskObject.id,
        }
      : taskObject
  );
  renderTasks(arrTaskObjects);
  localStorage.setItem("todoItems", JSON.stringify(arrTaskObjects));
};
console.log(arrTaskObjects);

todoItems.addEventListener("click", (event) => {
  if (event.target.classList.contains("todo__action_delete")) {
    deleteTask(event.target.parentNode);
  }

  if (event.target.classList.contains("todo__action_complete")) {
    crossOutTask(event.target.parentNode);
  }
});

const activeTasks = (arr) => {
  let arrActiveTasks = [];
  arrActiveTasks = arr.filter((task) => !task.completed);
  return arrActiveTasks;
};

const completedTasks = (arr) => {
  let arrComletedTasks = [];
  arrComletedTasks = arr.filter((task) => task.completed);
  renderTasks(arrComletedTasks);
};

select.addEventListener("click", (event) => {
  if (event.target.value === "all") {
    renderTasks(arrTaskObjects);
  } else if (event.target.value === "active") {
    renderTasks(activeTasks(arrTaskObjects));
  } else if (event.target.value === "completed") {
    completedTasks(arrTaskObjects);
  }
});

// const getInputValue = (event) => {
//   event.preventDefault();
//   const li = document.createElement("li");
//   const span = document.createElement("span");
//   li.classList.add("todo__item");
//   span.innerText = input.value;
//   span.classList.add("todo__task");
//   li.append(span);
//   todoItems.append(li);
// };
// btn.addEventListener("click", getInputValue);
