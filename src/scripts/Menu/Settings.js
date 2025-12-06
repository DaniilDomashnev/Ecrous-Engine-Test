/* ==========================================
   ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
========================================== */
window.addEventListener('load', () => {
	loadSavedTheme()
	loadCustomTheme()
	restoreAnimations()
	restoreHints()
})

/* ==========================================
   ЗАГРУЗКА СОХРАНЕННОЙ ТЕМЫ
========================================== */
function loadSavedTheme() {
	const saved = localStorage.getItem('theme') || 'Dark'

	// убираем старые темы
	document.body.classList.remove(
		...Array.from(document.body.classList).filter(c => c.startsWith('theme-'))
	)

	// если это кастомная тема
	if (saved.startsWith('theme-')) {
		document.body.classList.add(saved)
	} else {
		const map = {
			Dark: 'theme-dark',
			Light: 'theme-light',
			Night: 'theme-night',
			Ruby: 'theme-ruby',
			RubyLight: 'theme-ruby-light',
			RubyNeon: 'theme-ruby-neon',
			Emerald: 'theme-emerald',
			Gold: 'theme-gold',
			Diamond: 'theme-diamond',
			Sapphire: 'theme-sapphire',
			Gray: 'theme-gray',
			Mint: 'theme-mint',
			Sakura: 'theme-sakura',
			Sunset: 'theme-sunset',
			Frost: 'theme-frost',
		}

		document.body.classList.add(map[saved] || 'theme-dark')
	}

	// обновляем select
	const select = document.getElementById('ThemeSelect')
	if (select) select.value = saved
}

/* ==========================================
   ВОССТАНОВЛЕНИЕ КАСТОМНОЙ ТЕМЫ
========================================== */
function loadCustomTheme() {
	const css = localStorage.getItem('customThemeCSS')
	const name = localStorage.getItem('customThemeName')

	if (!css || !name) return

	addCustomThemeToDOM(name, css)
	addCustomThemeToSelect(name)
}

/* ==========================================
   СМЕНА СТАНДАРТНОЙ И КАСТОМНОЙ ТЕМЫ
========================================== */
function changeTheme() {
	const theme = document.getElementById('ThemeSelect').value

	// убираем все темы
	document.body.classList.remove(
		...Array.from(document.body.classList).filter(cls =>
			cls.startsWith('theme-')
		)
	)

	if (theme.startsWith('theme-')) {
		document.body.classList.add(theme)
	} else {
		const map = {
			Dark: 'theme-dark',
			Light: 'theme-light',
			Night: 'theme-night',
			Ruby: 'theme-ruby',
			RubyLight: 'theme-ruby-light',
			RubyNeon: 'theme-ruby-neon',
			Emerald: 'theme-emerald',
			Gold: 'theme-gold',
			Diamond: 'theme-diamond',
			Sapphire: 'theme-sapphire',
			Gray: 'theme-gray',
			Mint: 'theme-mint',
			Sakura: 'theme-sakura',
			Sunset: 'theme-sunset',
			Frost: 'theme-frost',
		}
		document.body.classList.add(map[theme])
	}

	localStorage.setItem('theme', theme)
}

/* ==========================================
   ДОБАВЛЕНИЕ КАСТОМНОЙ ТЕМЫ В DOM
========================================== */
function addCustomThemeToDOM(name, css) {
	const old = document.getElementById('custom-theme-style')
	if (old) old.remove()

	const style = document.createElement('style')
	style.id = 'custom-theme-style'
	style.textContent = css

	document.head.appendChild(style)
}

/* ==========================================
   ДОБАВИТЬ КАСТОМНУЮ ТЕМУ В SELECT
========================================== */
function addCustomThemeToSelect(name) {
	const select = document.getElementById('ThemeSelect')
	if (!select) return

	if ([...select.options].some(o => o.value === name)) return

	const option = document.createElement('option')
	option.value = name
	option.textContent = 'Custom: ' + name.replace('theme-', '')

	select.appendChild(option)
}

/* ==========================================
   ЗАГРУЗКА КАСТОМНОЙ ТЕМЫ ИЗ ФАЙЛА
========================================== */
document.getElementById('uploadThemeBtn').addEventListener('click', () => {
	document.getElementById('themeFileInput').click()
})

document
	.getElementById('themeFileInput')
	.addEventListener('change', async event => {
		const file = event.target.files[0]
		if (!file) return

		const text = await file.text()

		const match = text.match(/\.theme-[a-zA-Z0-9_-]+/)
		let themeName = 'theme-custom-' + Date.now()

		if (match) themeName = match[0].replace('.', '')

		// сохраняем
		localStorage.setItem('customThemeCSS', text)
		localStorage.setItem('customThemeName', themeName)

		addCustomThemeToDOM(themeName, text)
		addCustomThemeToSelect(themeName)

		applyTheme(themeName)

		alert('Тема успешно загружена и сохранена!')
	})

/* ==========================================
   ПРИМЕНЕНИЕ КАСТОМНОЙ ТЕМЫ
========================================== */
function applyTheme(name) {
	document.body.classList.remove(
		...Array.from(document.body.classList).filter(c => c.startsWith('theme-'))
	)

	document.body.classList.add(name)
	localStorage.setItem('theme', name)
}

/* ==========================================
   ОТКРЫТИЕ / ЗАКРЫТИЕ НАСТРОЕК
========================================== */
function openSettings() {
	document.getElementById('settingsPanel').style.display = 'block'
}

function closeSettings() {
	document.getElementById('settingsPanel').style.display = 'none'
}

/* ==========================================
   ЯЗЫК
========================================== */
function changeLanguage() {
	const lang = document.getElementById('languageSelect').value
	loadLanguage(lang)
}

/* ==========================================
   АНИМАЦИИ UI
========================================== */
function toggleUIAnimations() {
	const enabled = document.getElementById('uiAnimations').checked

	if (enabled) {
		document.body.classList.remove('no-animations')
		localStorage.setItem('uiAnimations', 'on')
	} else {
		document.body.classList.add('no-animations')
		localStorage.setItem('uiAnimations', 'off')
	}
}

function restoreAnimations() {
	if (localStorage.getItem('uiAnimations') === 'off') {
		document.body.classList.add('no-animations')
		const el = document.getElementById('uiAnimations')
		if (el) el.checked = false
	}
}

/* ==========================================
   ПОДСКАЗКИ
========================================== */
function toggleHints() {
	const enabled = document.getElementById('uiHints').checked
	localStorage.setItem('uiHints', enabled ? 'on' : 'off')
}

function restoreHints() {
	const state = localStorage.getItem('uiHints')
	if (state === 'off') {
		const el = document.getElementById('uiHints')
		if (el) el.checked = false
	}
}
