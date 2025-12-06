// ===== ЭЛЕМЕНТЫ =====
const uploadBtn = document.getElementById('uploadMusicBtn')
const fileInput = document.getElementById('musicFileInput')

const player = document.getElementById('musicPlayer')
const playPauseBtn = document.getElementById('playPauseBtn')
const currentTimeElem = document.getElementById('currentTime')
const durationElem = document.getElementById('duration')
const seekBar = document.getElementById('seekBar')
const volumeBar = document.getElementById('volumeBar')

// Аудио объект
let audio = new Audio()
audio.volume = 1

// ===== ОТКРЫТИЕ ФАЙЛА =====
uploadBtn.addEventListener('click', () => {
	fileInput.click()
})

fileInput.addEventListener('change', () => {
	const file = fileInput.files[0]
	if (!file) return

	const url = URL.createObjectURL(file)
	audio.src = url
	audio.play()

	player.style.display = 'flex'

	playPauseBtn.textContent = '⏸ Пауза'
})

// ===== ИГРА / ПАУЗА =====
playPauseBtn.addEventListener('click', () => {
	if (audio.paused) {
		audio.play()
		playPauseBtn.textContent = '⏸ Пауза'
	} else {
		audio.pause()
		playPauseBtn.textContent = '▶ Играть'
	}
})

// ===== ОБНОВЛЕНИЕ ПОЛЗУНКА =====
audio.addEventListener('loadedmetadata', () => {
	seekBar.max = audio.duration
	durationElem.textContent = formatTime(audio.duration)
})

audio.addEventListener('timeupdate', () => {
	seekBar.value = audio.currentTime
	currentTimeElem.textContent = formatTime(audio.currentTime)
})

// ===== ПЕРЕМОТКА =====
seekBar.addEventListener('input', () => {
	audio.currentTime = seekBar.value
})

// ===== ГРОМКОСТЬ =====
volumeBar.addEventListener('input', () => {
	audio.volume = volumeBar.value
})

// ===== ФОРМАТ ВРЕМЕНИ =====
function formatTime(sec) {
	sec = Math.floor(sec)
	let m = Math.floor(sec / 60)
	let s = sec % 60
	if (s < 10) s = '0' + s
	return `${m}:${s}`
}
