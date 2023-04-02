const date = document.getElementById('date');
const list = document.getElementById('list');
const btn = document.getElementById('btn');
const boxList = document.getElementById('list-box');

btn.addEventListener('click', postList);
// localStorage.clear();
function postList() {
    const day = date.value.trim()
    const lists = list.value.trim();

    if (day === '' || lists === '') return;

    const todo = {
        id: Date.now(),
        day: day,
        list: lists
    };


    saveList(todo);
    renderList(todo);
    date.value = '';
    list.value = '';
}

function saveList(todo) {
    const todoLists = getToDoLists();
    console.log(todoLists);
    todoLists.push(todo);
    localStorage.setItem('todo', JSON.stringify(todoLists));
}

function getToDoLists() {
    const lists = localStorage.getItem('todo');
    return lists ? JSON.parse(lists) : [];
}

function renderList(todo) {
    const todoElements = `
    <div class="list">
        <span class="day">${todo.day}</span>
        <span class="lists">${todo.list}</span>
        <button class="btn-delete">X</button>
    </div>
    `
    boxList.insertAdjacentHTML('afterbegin', todoElements);
    // tweetContainer.insertAdjacentHTML('afterbegin', tweetElement);
}