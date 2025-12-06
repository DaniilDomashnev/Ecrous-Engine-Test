function openThanks() {
	const panel = document.getElementById('thanksPanel')
	if (!panel) return
	panel.style.display = 'block'
}

function closeThanks() {
	const panel = document.getElementById('thanksPanel')
	if (!panel) return
	panel.style.display = 'none'
}
