/* =============================
      НОВОСТИ (ДАННЫЕ)
============================= */

const NEWS = [
	{
		title: 'Ecrous Engine — UI Update',
		date: '31.12.2025',
		short:
			'Глобальное обновление интерфейса редактора: визуальный UI-редактор, drag-and-drop, темы, анимации и тестирование.',
		full: `
        <h2>Ecrous Engine - UI Update</h2>
        <p>Новые возможности и улучшения в редакторе!</p>

        <h3>Новые возможности редактора для создания UI</h3>

        <h4>Визуальный редактор интерфейсов</h4>
        <ul>
            <li>Drag-and-drop система: перетаскивайте элементы UI прямо на сцену.</li>
            <li>Редактирование в реальном времени — изменения отображаются мгновенно.</li>
        </ul>

        <h4>Библиотека готовых элементов</h4>
        <ul>
            <li>Кнопки, слайдеры, чекбоксы, текстовые поля, выпадающие списки.</li>
            <li>Кастомизация: цвета, шрифты, размеры, анимации.</li>
        </ul>

        <h4>Адаптивный UI</h4>
        <ul>
            <li>Поддержка разных разрешений и устройств.</li>
            <li>Anchors для автоматического масштабирования.</li>
        </ul>

        <h4>Анимации и интерактивность</h4>
        <ul>
            <li>Плавные переходы и эффекты.</li>
            <li>Реакции на клики, наведение и ввод пользователя.</li>
        </ul>

        <h4>Интеграция с кодом</h4>
        <ul>
            <li>Поддержка скриптов для динамики UI.</li>
            <li>Экспорт интерфейсов в виде кода.</li>
        </ul>

        <h4>Поддержка тем</h4>
        <ul>
            <li>Светлая, тёмная и кастомные темы.</li>
        </ul>

        <h4>Тестирование</h4>
        <ul>
            <li>Симуляция разных устройств.</li>
            <li>Тестирование кликов, свайпов и поведения.</li>
        </ul>

        <h3>Когда обновление?</h3>
        <p><b>Beta — 31.12.2025</b><br>31 Декабря 2025 года</p>

        <p>© 2025 Ecrous Engine. Все права защищены.</p>
        `,
		link: 'https://daniildomashnev.github.io/UI-Update-EE/',
	},
]

/* =============================
      ФУНКЦИИ ОТКРЫТИЯ
============================= */

function openNews() {
	document.getElementById('newsPanel').style.display = 'block'
	renderNews()
}

function closeNews() {
	document.getElementById('newsPanel').style.display = 'none'
}

function openFullNews(index) {
	const panel = document.getElementById('fullNewsPanel')
	const content = document.getElementById('fullNewsContent')

	content.innerHTML = NEWS[index].full
	panel.style.display = 'block'
}

function closeFullNews() {
	document.getElementById('fullNewsPanel').style.display = 'none'
}

/* =============================
      ОТРИСОВКА СПИСКА НОВОСТЕЙ
============================= */

function renderNews() {
	const list = document.getElementById('newsList')
	list.innerHTML = ''

	NEWS.forEach((n, index) => {
		const card = document.createElement('div')
		card.className = 'news-item'

		card.innerHTML = `
            <h3>${n.title}</h3>
            <div class="date">${n.date}</div>
            <p>${n.short}</p>
            <button class="news-button" onclick="openFullNews(${index})">Читать полностью</button>
        `

		list.appendChild(card)
	})
}
