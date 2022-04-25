/*
CRUD - Create / Read / Update / Delete
Simple ToDo List with +added features

*Important/Notice:
You can add more features in this Project it's totally Free :)

In this ToDo you'll see some:
Short ways; 
I mean like 2 ways how to make a crud operations,

Thank You!
*/

// Selectors
const input = document.getElementById('todo'),
button = document.getElementById('btn-submit'),
error = document.getElementsByClassName('error')[0],
todos_container = document.getElementById('todos'),
save = document.getElementById('save'),
clear = document.getElementById('clear'),
intro = document.getElementById('intro');

// Todos
let _todos = getTodos(); // get All Todos
let todo_id = -1; // todo_id and edit logic
const generateRandomID = () => Math.floor(Math.random() * 99999999999);

// Show Todos
window.onload = () => {
    displayTodos(_todos);
    todoLocalBtn(save, clear);
}

// create / update
input.addEventListener('keyup', (event) => {
    let input_value = event.target.value;
    if(event.code === "Enter" || event.code === "NumpadEnter") {// event.keyCode === 13
        addTodo(input_value);
    }
});

button.addEventListener('click', e => {
    addTodo(input.value);
});

// AddTodo | Button or Keyboard Key Supported
function addTodo(input_value) {
    if(error) setTimeout(() => {
        error.classList.remove('d-block');
    }, 3000);

    if(input_value.length > 122) {
        error.innerHTML = "Todo is too Long, Max is 122 Chars!";
        error.classList.add('d-block');
        return;
    }

    if(input_value === '') {
        error.innerHTML = "Todo field cannot be empty!";
        error.classList.add('d-block');
    } else {
        if(todo_id != -1) {
            _todos.forEach(todo => {
                if(todo.id && todo.id === todo_id) {
                    todo.title = input.value;
                    todo_id = -1;
                    todo.edit = false;
                }
            });
        } else {
            _todos.push({id: generateRandomID(), title: input_value, completed: false, edit: false});
        }
        input.value = '';
        displayTodos(_todos);
        todoLocalBtn(save, clear);
        removeIntro();
    }
}

// read
const displayTodos = todos => {
    let result = '';
    todos.forEach(todo => {
        result += `
        <div class="todo${todo.edit === true ? ' d-none' : ''}">
            <span class="w-75 text-break${todo.completed === true ? ' text-decoration-line-through text-muted' : ''} m-2 me-0">${todo.title}</span>
            <div class="actions">
                <button class="btn btn-link text-success" onclick="changeTodoState(${todo.id})">${todo.completed === true ? '<i class="fa-solid fa-circle-xmark text-danger"></i>' : '<i class="fa-solid fa-circle-check"></i>'}</button>
                <button class="btn btn-link text-dark" onclick="editTodo(${todo.id})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn btn-link text-danger" onclick="deleteTodo(${todo.id}, event)"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
        `;
    });
    todos_container.innerHTML = result;

    saveToLocalStorage(todos);
    todoLocalBtn(save, clear);
}

// Completed and !Completed (mode)
const changeTodoState = id => {
    _todos.forEach(todo => {
        if(todo.id === id) {
            todo.completed = !todo.completed;
        }
    });

    displayTodos(_todos);
}

// edit | update
const editTodo = id => {
    const todo = _todos.filter(todo => todo.id === id);

    todo_id = id;

    todo.forEach(item => {
        input.value = item.title;

        if(todo_id != -1) {
            item.edit = true; // while editing todo: remove it then edit and show updated todo
        }
    });

    displayTodos(_todos);
}

// delete
const deleteTodo = id => {
    // short way
    _todos = _todos.filter(todo => todo.id != id);

    /* removes target-ed todo item
    > _todos.forEach works too 
    } in below ex. i have used splice method */

    // _todos.filter((todo, index) => {
    //     if(todo.id === id) {
    //         _todos.splice(index, 1)
    //     }
    // });

    displayTodos(_todos);
}

// Save todos locally
function saveToLocalStorage(todos) {
    localStorage.setItem('_todos', JSON.stringify(todos));
}

// onclick manually save todos
save.addEventListener('click', () => {
    saveToLocalStorage(_todos);
});

// getTodos to Display Them
function getTodos() {
    let getTodos = localStorage.getItem('_todos');
    if(getTodos == null || getTodos == undefined) {
        return getTodos = [];
    } else {
        return JSON.parse(getTodos);
    }

    // short way to do the condition for getTodos
    // return (getTodos == null || getTodos == undefined) 
    // ?
    // []
    // :
    // JSON.parse(getTodos);
}

// Show/Hide Buttons while Todos added or removed
const todoLocalBtn = (...btns) => {
    btns.forEach(btn => {
        return btn.style.display = (_todos.length == 0) ?  btn.classList.add('d-none') : btn.classList.remove('d-none');
    });
}

// Clear All Todos
clear.addEventListener('click', () => {
    _todos = [];
    displayTodos(_todos);
});

// Welcome/Info Msg
const removeIntro = () => {
    if(intro || _todos.length > 0) {
        localStorage.setItem('intro', 'closed');
        intro.classList.add('d-none');
    }
}

intro.addEventListener('click', e => {
    if(e.target.classList.contains('close')) {
        removeIntro();
    }
});

let getIntroStatus = localStorage.getItem('intro');
if(getIntroStatus == 'closed') intro.remove(); // show once


// Suggest a Todo
const suggest_a_toDo = [
    "Start learning JavaScript!",
    "Make a To-Do :)",
    "Learn React.js or Vue.js or ...",
    "Make a Cup of Coffe",
    "Read a Book",
    "Do HomeWork",
    "Study for Uni",
    "Nothing just Do whatever you want :)",
    "Make someone Happy",
    "Teach a friend to Code",
    "Help a Friend or Family Member",
    "Keep Trying and Push Yourself",
    "Be your best version (update / restart)",
    "..."
];

const suggestOneTodo = document.querySelector('.suggested');
if(suggestOneTodo) suggestOneTodo.innerHTML = suggest_a_toDo[Math.floor(Math.random() * suggest_a_toDo.length)];