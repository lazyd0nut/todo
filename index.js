// Model
let todos;
const savedTodos = JSON.parse(localStorage.getItem('todos'));
if(Array.isArray(savedTodos)){
    todos = savedTodos;
}
else{
    todos = [
        {
            name: 'Groceries',
            dueDate: '2022-06-01',
            id: 'id1',
            isChecked: false,
            isEditing: false 
        }
    ];
}

function saveTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('saved');
}

function resetTodos(){
    localStorage.clear();
    window.location.reload();
}

function addTodoM(todoNameF, todoDateF, todoId){
    todos.push({
        name: todoNameF,
        dueDate: todoDateF,
        id: todoId,
        isChecked: false,
        isEditing: false
    });
    saveTodos();
}

function removeTodoM(idToDelete){
    todos = todos.filter(todo => {
        if(todo.id === idToDelete){
            return false;
        }
        else return true;
    });
    saveTodos();
}

function editTodoM(editId){
    todos.forEach(todo => {
        if(editId === todo.id){
            todo.isEditing = true;
        }
        else todo.isEditing = false;
    });
}

function updateTodoM(updateId, editTextBox, editDate){
    todos.forEach(todo => {
        if(updateId === todo.id){
            todo.name = editTextBox;
            todo.dueDate = editDate;
            todo.isEditing = false;
        }
    });
    saveTodos();
}

function checkTodoM(checkId, isChecked){
    todos.forEach(todo => {
        if(checkId === todo.id && isChecked){
            todo.isChecked = true;
        }
        else if(checkId === todo.id && isChecked === false){
            todo.isChecked = false;
        }
    });
    saveTodos();
}
// Controller
function addTodo(){
    let textField = document.getElementById('input-todo');
    let dateField = document.getElementById('input-date');
    
    let todoNameF = textField.value;
    let todoDateF = dateField.value;
    let todoId = new Date().getTime() + '';

    addTodoM(todoNameF, todoDateF, todoId);
    console.log('todos');
    render();
}

function removeTodo(event){
    let removeButton = event.target;
    let idToDelete = removeButton.id;

    removeTodoM(idToDelete);
    render();
}

function editTodo(event){
    let editButton = event.target;
    let editId = editButton.dataset.todoId;

    editTodoM(editId);
    render();
}

function updateTodo(event){
    let updateButton = event.target;
    let updateId = updateButton.dataset.todoId;

    let editTextBoxId = 'todo-name-' + updateId;
    let editDateId = 'todo-date-' + updateId;

    let editTextBox = document.getElementById(editTextBoxId).value;
    let editDate = document.getElementById(editDateId).value;

    updateTodoM(updateId, editTextBox, editDate);
    render();
}

function checkTodo(event){
    let checkButton = event.target;
    let checkId = checkButton.id;
    let isChecked = checkButton.checked;

    checkTodoM(checkId, isChecked);
    render();
}
// View

function render(){
    let allTodosContainer = document.getElementById('todo-container');
    
    allTodosContainer.innerHTML = '';

    todos.forEach(todo => {
       let todoContainer = document.createElement('div');
       todoContainer.classList.add('single-todo');

       if(todo.isEditing){
        let editContainer = document.createElement('div');
        let inputContainer = document.createElement('div');

        let editTextBox = document.createElement('input');
        let editDate = document.createElement('input');
        let updateButton = document.createElement('button');

        editContainer.style = 'display: flex; justify-content: space-between';

        editTextBox.value = todo.name;
        editTextBox.id = 'todo-name-' + todo.id;
        editTextBox.classList.add('input-todo');
        editTextBox.style.marginRight = '5px'

        editDate.type = 'date';
        editDate.value = todo.dueDate;
        editDate.id = 'todo-date-' + todo.id;
        editDate.classList.add('input-date');

        updateButton.innerText = 'Update';
        updateButton.dataset.todoId = todo.id;
        updateButton.onclick = updateTodo;
        
        inputContainer.appendChild(editTextBox);
        inputContainer.appendChild(editDate);
        editContainer.append(inputContainer);
        editContainer.appendChild(updateButton);
        todoContainer.appendChild(editContainer);
       }
       else{
        let todoTextContainer = document.createElement('div');
        let buttonsContainer = document.createElement('div');
        let deleteTodoButton = document.createElement('button');
        let editButton = document.createElement('button');
        let checkButton = document.createElement('input');
        
        todoTextContainer.innerText = todo.name + ' ' + todo.dueDate;
        todoTextContainer.style = 'display: inline-block; width: 300px';

        buttonsContainer.style = 'display: inline-block;';

        deleteTodoButton.innerText = 'Delete';
        deleteTodoButton.id = todo.id;
        deleteTodoButton.onclick = removeTodo;

        editButton.innerText = 'Edit';
        editButton.style.marginRight = '5px';
        editButton.dataset.todoId = todo.id;
        editButton.onclick = editTodo;

        checkButton.type = 'checkbox';
        checkButton.id = todo.id;
        checkButton.onchange = checkTodo;
        if(todo.isChecked){
        checkButton.checked = true;
        }
        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(deleteTodoButton);
        todoContainer.appendChild(todoTextContainer);
        todoContainer.appendChild(buttonsContainer);
        todoContainer.prepend(checkButton);
       }
       allTodosContainer.appendChild(todoContainer);
    });
}
render();