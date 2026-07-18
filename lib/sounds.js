'use client'

// Sons synthétisés via Web Audio API — zéro fichier, zéro coût.
let audioCtx

function getContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  return audioCtx
}

function tone(freq, start, duration, type = 'sine', gain = 0.15) {
  const ctx = getContext()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  gainNode.gain.value = gain
  osc.connect(gainNode)
  gainNode.connect(ctx.destination)
  osc.start(ctx.currentTime + start)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration)
  osc.stop(ctx.currentTime + start + duration)
}

function soundsEnabled() {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem('cec_sound_enabled') !== 'false'
}

export function setSoundEnabled(enabled) {
  window.localStorage.setItem('cec_sound_enabled', String(enabled))
}

export function playCorrect() {
  if (!soundsEnabled()) return
  tone(880, 0, 0.12, 'sine', 0.12)
  tone(1318, 0.08, 0.15, 'sine', 0.1)
}

export function playIncorrect() {
  if (!soundsEnabled()) return
  tone(220, 0, 0.18, 'sawtooth', 0.08)
}

export function playLevelUp() {
  if (!soundsEnabled()) return
  ;[523, 659, 784, 1046].forEach((freq, i) => tone(freq, i * 0.1, 0.25, 'triangle', 0.13))
}

export function vibrate(pattern = 15) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(pattern)
}
