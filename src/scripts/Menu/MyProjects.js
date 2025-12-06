// ===============================
// Панель "Мои проекты"
// ===============================

// Открыть панель
function openMyProjects() {
	const panel = document.getElementById('MyProjectsPanel')
	panel.style.display = 'block'
}

// Закрыть панель
function closeMyProjects() {
	const panel = document.getElementById('MyProjectsPanel')
	panel.style.display = 'none'
}

// ===============================
// Работа со списком проектов
// ===============================

let projects = JSON.parse(localStorage.getItem('ecrous_projects')) || []

// Отобразить проекты
function renderProjects() {
    const list = document.getElementById('projectList');
    list.innerHTML = '';

    if (projects.length === 0) {
        list.innerHTML = `
            <div class="empty-projects">
                <img src="https://img.icons8.com/?size=100&id=Rtc4TvgYD4oM&format=png&color=FFFFFF">
                <p>Похоже, у вас еще нет проектов.
Создайте новый или импортируйте!</p>
            </div>
        `
        return;
    }

    projects.forEach((name, index) => {
        const item = document.createElement('div');
        item.className = 'project-item';

        item.innerHTML = `
            <span>${name}</span>

            <div class="project-menu">
                <button class="menu-dots" onclick="toggleMenu(event, ${index})">
                    <img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/menu-2.png">
                </button>

                <div class="menu-dropdown" id="menu-${index}">
                    <div onclick="renameProject(${index})">Переименовать</div>
                    <div onclick="deleteProject(${index})" class="danger">Удалить</div>
                </div>
            </div>
        `;

        list.appendChild(item);
    });
}

// Удаление проекта
function deleteProject(index) {
	projects.splice(index, 1)
	saveProjects()
	renderProjects()
}

// Сохранение проектов
function saveProjects() {
	localStorage.setItem('ecrous_projects', JSON.stringify(projects))
}

// ===============================
// Создание проекта (модальное окно)
// ===============================

const modal = document.getElementById('projectModal')
const submitBtn = document.getElementById('submitProject')

function openCreateProject() {
	modal.style.display = 'flex'
	document.getElementById('projectName').value = ''
}

function closeCreateProject() {
	modal.style.display = 'none'
}

document.querySelector('.plus-button').onclick = openCreateProject

// Подтверждение создания проекта
submitBtn.onclick = function () {
	const name = document.getElementById('projectName').value.trim()
	if (name.length === 0) return

	projects.push(name)
	saveProjects()
	renderProjects()
	closeCreateProject()
}

// Закрытие модалки по клику вне неё
window.onclick = function (event) {
	if (event.target === modal) {
		modal.style.display = 'none'
	}
}

// ===============================
// Импорт проекта
// ===============================

document.querySelector('.import-button').onclick = function () {
	alert('Импорт будет добавлен позже. Пока это заглушка.')
}

// ===============================
// Инициализация
// ===============================

renderProjects()

// Открытие / закрытие меню
function toggleMenu(event, index) {
    event.stopPropagation();
    closeAllMenus();

    const menu = document.getElementById(`menu-${index}`);
    menu.classList.toggle("active");
}

// Закрытие всех меню при клике мимо
window.addEventListener("click", () => {
    closeAllMenus();
});

function closeAllMenus() {
    document.querySelectorAll(".menu-dropdown").forEach(m => m.classList.remove("active"));
}

// Переименование проекта
function renameProject(index) {
    const newName = prompt("Введите новое название проекта:", projects[index]);
    if (!newName) return;
    projects[index] = newName.trim();
    saveProjects();
    renderProjects();
}
