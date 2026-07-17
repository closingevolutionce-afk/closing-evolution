'use client'

import { useEffect, useRef, useState } from 'react'
import { Mic, Square } from 'lucide-react'
import { cn } from '@/lib/utils'

// Dictée vocale 100% côté navigateur (Web Speech API) — aucun appel à l'IA,
// donc aucun coût API. Le texte transcrit part ensuite exactement comme s'il
// avait été tapé au clavier.
export default function VoiceButton({ onTranscript, className = '' }) {
  const [listening, setListening] = useState(false)
  const [supported, setSupported] = useState(false)
  const recognitionRef = useRef(null)
  const onTranscriptRef = useRef(onTranscript)

  useEffect(() => {
    onTranscriptRef.current = onTranscript
  }, [onTranscript])

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = 'fr-FR'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onTranscriptRef.current(transcript)
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)

    recognitionRef.current = recognition
    setSupported(true)

    return () => recognition.stop()
  }, [])

  if (!supported) return null

  function toggle() {
    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
    } else {
      recognitionRef.current?.start()
      setListening(true)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={listening ? 'Arrêter la dictée' : 'Dicter au micro'}
      title={listening ? 'Arrêter la dictée' : 'Dicter au micro'}
      className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors',
        listening
          ? 'bg-coral text-white animate-pulse'
          : 'bg-ink-300 text-mist-muted hover:text-white',
        className
      )}
    >
      {listening ? (
        <>
          <Square size={13} />
          <span className="sr-only">Enregistrement en cours</span>
        </>
      ) : (
        <Mic size={16} />
      )}
    </button>
  )
}
