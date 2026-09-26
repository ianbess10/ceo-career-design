import { useEffect, useId, useRef } from 'react'
import { steps } from '../data/steps'
import { exportAsPdf, exportAsText } from '../utils/exportDoc'

export default function CompletionBanner({ open, onClose, onDismissForever, checks, notes, progress }) {
  const titleId = useId()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal modal--celebrate"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="eyebrow">Complete</p>
        <h2 id={titleId} className="modal__title">
          Career Design Doc ready
        </h2>
        <div className="gold-rule" />
        <p className="modal__lead">
          You finished all {progress.total} actions across {steps.length} stages.
          Export your summary, or keep refining notes and revisiting stages.
        </p>
        <div className="modal__actions">
          <button
            type="button"
            className="btn btn--solid"
            onClick={() => exportAsPdf({ checks, notes, progress })}
          >
            Export PDF
          </button>
          <button
            type="button"
            className="btn btn--outline"
            onClick={() => exportAsText({ checks, notes, progress })}
          >
            Export text
          </button>
          <button ref={closeRef} type="button" className="btn btn--ghost" onClick={onClose}>
            Keep refining
          </button>
        </div>
        <button type="button" className="modal__quiet" onClick={onDismissForever}>
          Don’t show this again
        </button>
      </div>
    </div>
  )
}
