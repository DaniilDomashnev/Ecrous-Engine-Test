// -------- ОТКРЫТЬ / ЗАКРЫТЬ --------

function openProfile() {
	const panel = document.getElementById('profilePanel')
	panel.style.display = 'block'

	loadProfileInfo() // загружаем инфу при открытии
}

function closeProfile() {
	document.getElementById('profilePanel').style.display = 'none'
}

// -------- ЗАГРУЗКА ДАННЫХ ПРОФИЛЯ --------

function loadProfileInfo() {
	// Можно заменить на реальные данные
	document.getElementById('profileName').innerText =
		localStorage.getItem('username') || 'Неизвестный пользователь'
	document.getElementById('profileID').innerText =
		localStorage.getItem('userid') || '0000'
	document.getElementById('profileLastSeen').innerText =
		localStorage.getItem('lastSeen') || 'только что'

	// На будущее — можно грузить с сервера
}

// -------- СМЕНА ТЕМЫ --------

function toggleTheme() {
	document.body.classList.toggle('light-theme')

	if (document.body.classList.contains('light-theme')) {
		alert('Светлая тема включена.')
	} else {
		alert('Тёмная тема включена.')
	}
}

// -------- ВЫХОД --------

function logout() {
	alert('Вы вышли из аккаунта.')
	// Очистка данных
	localStorage.removeItem('username')
	localStorage.removeItem('userid')
}
