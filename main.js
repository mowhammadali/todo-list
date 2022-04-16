const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button i");
const todoList = document.querySelector(".todo-list");
const filterTodo = document.querySelector(".filter-todo");


todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCompleteTodo);
filterTodo.addEventListener("click", filterTodoItem);
document.addEventListener("DOMContentLoaded", getTodo);
document.addEventListener("keydown" , event => {
    if(event.keyCode == 13){
        addTodo();
    }
})


function addTodo() {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerText = todoInput.value;

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = `<i class="bi bi-check-circle-fill"></i>`;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = `<i class="bi bi-trash3-fill"></i>`;

    todoDiv.appendChild(todoItem);
    todoDiv.appendChild(completeBtn);
    todoDiv.appendChild(deleteBtn);

    if (todoInput.value != "") {
        todoList.appendChild(todoDiv);
        saveLocalTodo(todoInput.value);
    }

    todoInput.value = "";
}



function deleteCompleteTodo(event) {
    const item = event.target;
    if (item.classList[0] == "delete-btn") {
        item.parentElement.remove();
        removeLocalTodo(item.parentElement);
    }
    if (item.classList[0] == "complete-btn") {
        item.parentElement.classList.toggle("completed");
    }
}



function filterTodoItem(event) {
    const todos = todoList.childNodes;

    todos.forEach(function (item) {
        switch (event.target.value) {
            case "All":
                item.style.display = "flex";
                break;
            case "Completed":
                if (item.classList.contains("completed")) {
                    item.style.display = "flex"
                } else {
                    item.style.display = "none";
                }
                break;
            case "Uncompleted":
                if (item.classList.contains("completed")) {
                    item.style.display = "none"
                } else {
                    item.style.display = "flex";
                }
                break;
        }
    })
}



function saveLocalTodo(todo) {
    let todos;

    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
}



function removeLocalTodo(todo) {
    let todos;

    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem("todos", JSON.stringify(todos));
}



function getTodo() {
    let todos;

    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const todoItem = document.createElement("li");
        todoItem.classList.add("todo-item");
        todoItem.innerText = todo;

        const completeBtn = document.createElement("button");
        completeBtn.classList.add("complete-btn");
        completeBtn.innerHTML = `<i class="bi bi-check-circle-fill"></i>`;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = `<i class="bi bi-trash3-fill"></i>`;

        todoDiv.appendChild(todoItem);
        todoDiv.appendChild(completeBtn);
        todoDiv.appendChild(deleteBtn);

        todoList.appendChild(todoDiv);

    })
}
