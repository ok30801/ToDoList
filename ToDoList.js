let input = document.querySelector('#input-task'),
    alertMessage = document.querySelector('.alert-message'),
    button = document.querySelector('.btn'),
    wrapApp = document.querySelector('.container'),
    taskList = document.querySelector('#task-list');

// Отмена контекстного меню при клике правой кл. мыши

wrapApp. addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

let tasksArr = [];

// Возврат задач из localStorage

if (localStorage.getItem('tasks')) {
    tasksArr = JSON.parse(localStorage.getItem('tasks'));
    showTasks();
}

// Добавление новой задачи в массив tasksArr

button.addEventListener('click', () => {

    let newTask = {
        taskList: input.value,
        checked: false,
    }
    if(input.value == '') {
        /*alertMessage.style.display = 'block'
        alertMessage.className = 'alert-message-show'*/
        alert('Добавьте описание!!!');
    }else{
        tasksArr.push(newTask);
        alertMessage.style.display = 'none'
        input.value = '';
    }
    showTasks();

    // Save записанных задач в массив tasksArr
    localStorage.setItem('tasks', JSON.stringify(tasksArr)); // 'tasks' - произвольное имя
    location.reload();
});

// Вывод задач в окно приложения

function showTasks() {

    let showTasks = '';
    tasksArr.forEach((item, index) => {
        showTasks += `
            <li class="check-list">
                <div class="wrapper">
                    <div class="check-wrap">
                            <input type='checkbox' id='item_${index}' ${item.checked ? 'checked' : ''}>
                            <label id="check" for='item_${index}'>${item.taskList}</label>
                    </div>
                    <div class="input-edit">
                        <input type="text" id="edit_${index}" class="edit" maxlength="47">
                    </div>
                </div>
                <div class="edit-close-wrap">
                    <div class="icon-edit">&#9999;</div>
                    <div class="save" ><i class="fa fa-floppy-o"></i></div>
                    <div class="close"><i class="fa fa-trash-o"></i></div>
                </div>
            </li>
        `;
        taskList.innerHTML = showTasks
    });
}

// Save отметок (галочек) в localStorage

taskList.addEventListener('change', (e) => {
    let idInput = e.target.getAttribute('id');
    let forLabel = taskList.querySelector('[for='+ idInput +']');
    let valueLabel = forLabel.innerHTML;

    tasksArr.forEach(item => {
        if(item.taskList === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('tasks', JSON.stringify(tasksArr));
        }
    });
});

// Удаление задач из общего списка

let close = document.querySelectorAll('.fa-trash-o');

close.forEach((item, i) => {

    item.addEventListener('click', (e) => {
        if(e.target === item) {
            tasksArr.splice(i, 1)
        }
        location.reload();
        localStorage.setItem('tasks', JSON.stringify(tasksArr));
        showTasks();
    });
});

// Редактирование задачи

let editButton = document.querySelectorAll('.icon-edit'),
    editInput = document.querySelectorAll('.edit'),
    saveButton = document.querySelectorAll('.save');

editButton.forEach((item, i) => {

    item.addEventListener('click', (e) => {
        editInput.forEach((item, i) => {
            editInput[i].value = JSON.parse(JSON.stringify(tasksArr[i].taskList));
        });
        /*if(e.currentTarget === item) {*/
            editInput.item(i).style.display = 'block';
            editButton.item(i).style.display = 'none';
            saveButton.item(i).style.display = 'block';
        /*}*/
    });
});

// Видимость кнопки редактирования, скрытие input и кн. save при отмене редактирования

function editButtonShow() {
    editButton.forEach((item, i) => {
        editButton.item(i).style.display = 'block';
    });
    editInput.forEach((item, i) => {
        editInput.item(i).style.display = 'none';
    });
    saveButton.forEach((item, i) => {
        saveButton.item(i).style.display = 'none';
    });
}

// Отмена редактирования

document.body.addEventListener('keydown', (e) => {
    if(e.keyCode === 27){
        editButtonShow()
    }
});

// Сохранение отредактированной записи

saveButton.forEach((item, i) => {

    item.addEventListener('click', () => {
        JSON.parse(JSON.stringify(tasksArr[i].taskList));
        tasksArr[i].taskList = editInput[i].value;
        location.reload();
        localStorage.setItem('tasks', JSON.stringify(tasksArr));
        showTasks();
    });
});

// Рабочий код удаления по ctrl + right button mouse

/*taskList.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    tasksArr.forEach((item, i) => {

        if(item.taskList === e.target.innerHTML) {
            if(e.ctrlKey) {
                tasksArr.splice(i, 1)
            }
        }
        showTasks()
        localStorage.setItem('tasks', JSON.stringify(tasksArr));
    });
});*/














