// Theme Toggle
function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-toggle').textContent = '☀️';
    }
}

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('theme-toggle').textContent = isDark ? '☀️' : '🌙';
});

loadTheme();

// Custom Name
function loadName() {
    return localStorage.getItem('userName') || '';
}

function saveName(name) {
    localStorage.setItem('userName', name);
}

const nameInput = document.getElementById('name-input');
nameInput.value = loadName();

nameInput.addEventListener('input', () => {
    saveName(nameInput.value);
    updateGreeting();
});

// Greeting and DateTime
function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const greetingText = document.getElementById('greeting-text');
    const userName = loadName();
    
    let greeting = '';
    if (hour < 12) {
        greeting = 'Good Morning';
    } else if (hour < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }
    
    greetingText.textContent = userName ? `${greeting}, ${userName}` : greeting;
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('datetime').textContent = `${dateStr} • ${timeStr}`;
}

updateGreeting();
setInterval(updateGreeting, 1000);

// Focus Timer
let timerInterval = null;
let timerDuration = parseInt(localStorage.getItem('timerDuration') || '25');
let timeLeft = timerDuration * 60;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer-display').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

document.getElementById('start-btn').addEventListener('click', () => {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                alert('Focus session complete!');
            }
        }, 1000);
    }
});

document.getElementById('stop-btn').addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
});

document.getElementById('reset-btn').addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timeLeft = timerDuration * 60;
    updateTimerDisplay();
});

document.getElementById('set-timer-btn').addEventListener('click', () => {
    const minutes = parseInt(document.getElementById('timer-minutes').value);
    if (minutes > 0 && minutes <= 60) {
        timerDuration = minutes;
        localStorage.setItem('timerDuration', timerDuration);
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        timeLeft = timerDuration * 60;
        updateTimerDisplay();
    }
});

document.getElementById('timer-minutes').value = timerDuration;
updateTimerDisplay();

// To-Do List
function loadTodos() {
    return JSON.parse(localStorage.getItem('todos') || '[]');
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const todos = loadTodos();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.done ? 'done' : ''}`;
        
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;
        span.contentEditable = false;
        
        span.addEventListener('click', () => {
            todos[index].done = !todos[index].done;
            saveTodos(todos);
            renderTodos();
        });
        
        span.addEventListener('dblclick', () => {
            span.contentEditable = true;
            span.classList.add('editing');
            span.focus();
        });
        
        span.addEventListener('blur', () => {
            span.contentEditable = false;
            span.classList.remove('editing');
            todos[index].text = span.textContent.trim();
            saveTodos(todos);
            renderTodos();
        });
        
        span.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                span.blur();
            }
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos(todos);
            renderTodos();
        });
        
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

document.getElementById('add-todo-btn').addEventListener('click', () => {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    
    if (text) {
        const todos = loadTodos();
        todos.push({ text, done: false });
        saveTodos(todos);
        input.value = '';
        renderTodos();
    }
});

document.getElementById('todo-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('add-todo-btn').click();
    }
});

renderTodos();

// Quick Links
function loadLinks() {
    return JSON.parse(localStorage.getItem('links') || '[]');
}

function saveLinks(links) {
    localStorage.setItem('links', JSON.stringify(links));
}

function renderLinks() {
    const links = loadLinks();
    const container = document.getElementById('links-container');
    container.innerHTML = '';
    
    links.forEach((link, index) => {
        const div = document.createElement('div');
        div.className = 'link-item';
        
        const btn = document.createElement('button');
        btn.className = 'link-btn';
        btn.textContent = link.name;
        btn.addEventListener('click', () => {
            window.open(link.url, '_blank');
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.className = 'delete-link';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            links.splice(index, 1);
            saveLinks(links);
            renderLinks();
        });
        
        div.appendChild(btn);
        div.appendChild(deleteBtn);
        container.appendChild(div);
    });
}

document.getElementById('add-link-btn').addEventListener('click', () => {
    const nameInput = document.getElementById('link-name');
    const urlInput = document.getElementById('link-url');
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    
    if (name && url) {
        const links = loadLinks();
        links.push({ name, url });
        saveLinks(links);
        nameInput.value = '';
        urlInput.value = '';
        renderLinks();
    }
});

renderLinks();
