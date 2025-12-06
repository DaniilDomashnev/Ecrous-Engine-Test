let currentLang = localStorage.getItem('lang') || 'ru'
let translations = {}

function loadLanguage(lang) {
	fetch(`src/locales/${lang}.json`)
		.then(res => {
			if (!res.ok) {
				throw new Error('Файл не найден: ' + res.status)
			}
			return res.json()
		})
		.then(data => {
			translations = data
			currentLang = lang
			localStorage.setItem('lang', lang)
			applyTranslations()
		})
		.catch(err => console.error('Ошибка загрузки языка:', err))
}

function applyTranslations() {
	document.querySelectorAll('[data-translate]').forEach(el => {
		const key = el.getAttribute('data-translate')
		if (translations[key]) {
			el.textContent = translations[key]
		}
	})
}

// Загружаем язык при запуске
window.addEventListener('load', () => {
	loadLanguage(currentLang)
})
