let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
let taskDates = JSON.parse(localStorage.getItem('taskDates')) || [];

function addTask() {
    const input = document.getElementById('taskInput');
    const dateInput = document.getElementById('taskDate');
    const task = input.value.trim();
    const date = dateInput.value;
    
    if (task) {
        tasks.push(task);
        taskDates.push(date);
        input.value = '';
        dateInput.value = '';
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    completedTasks.splice(index, 1);
    taskDates.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    completedTasks[index] = !completedTasks[index];
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    localStorage.setItem('taskDates', JSON.stringify(taskDates));
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (completedTasks[index]) {
            li.classList.add('completed');
        }
        li.innerHTML = `
            ${task}
            ${taskDates[index] ? `<span class="task-date">(${taskDates[index]})</span>` : ''}
            <div class="task-controls">
                <button class="complete-btn" onclick="toggleTask(${index})">
                    ${completedTasks[index] ? 'Отменить' : 'Готово'}
                </button>
                <button class="delete-btn" onclick="deleteTask(${index})">Удалить</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Обработка нажатия Enter в поле ввода
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
}); 