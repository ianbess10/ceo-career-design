import { useEffect, useId, useRef } from 'react'

export default function OnboardingModal({ open, onStart, onDismiss }) {
  const titleId = useId()
  const startRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    startRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onDismiss()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onDismiss])

  if (!open) return null

  return (
    <div className="modal-backdrop" role="presentation" onClick={onDismiss}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="eyebrow">Welcome</p>
        <h2 id={titleId} className="modal__title">
          Design your path with clarity
        </h2>
        <div className="gold-rule" />
        <p className="modal__lead">
          This system walks you through six stages — from your North Star to legacy —
          so ambition becomes a designed career, not a sequence of titles.
        </p>
        <ol className="modal__steps">
          <li>Work one stage at a time; check off actions as you complete them.</li>
          <li>Capture notes in each stage — they export with your Career Design Doc.</li>
          <li>Progress saves in this browser so you can leave and return.</li>
          <li>Export anytime as text or PDF; reset a stage or everything when needed.</li>
        </ol>
        <div className="modal__actions">
          <button ref={startRef} type="button" className="btn btn--solid" onClick={onStart}>
            Begin Stage 1
          </button>
          <button type="button" className="btn btn--ghost" onClick={onDismiss}>
            Continue where I left off
          </button>
        </div>
      </div>
    </div>
  )
}
