const date = document.getElementById('date');
const list = document.getElementById('list');
const btn = document.getElementById('btn');
const boxList = document.getElementById('list-box');

btn.addEventListener('click', postList);
boxList.addEventListener('click', handleTweetActions);
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
    <div class="list" data-id="${todo.id}">
        <span class="day">${todo.day}</span>
        <span class="lists">${todo.list}</span>
        <button class="delete">X</button>
    </div>
    `
    boxList.insertAdjacentHTML('afterbegin', todoElements);
}

function handleTweetActions(event) {
    const target = event.target;
    const todoElement = target.closest('.list');
    const id = parseInt(todoElement.dataset.id);

    if (target.classList.contains('delete')) {
        deleteLists(id);
        todoElement.remove();
    }

}

function deleteLists(id) {
    let lists = getToDoLists();
    lists = lists.filter(todo => todo.id !== id)
    localStorage.setItem('todo', JSON.stringify(lists));
}

function loadLists() {
    const todoLists = getToDoLists();
    todoLists.forEach(todo => renderList(todo));
}

loadLists();