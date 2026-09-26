import ActionChecklist from './components/ActionChecklist'
import ExpertTip from './components/ExpertTip'
import FrameworkDiagram from './components/FrameworkDiagram'
import Stepper from './components/Stepper'
import { steps } from './data/steps'
import { useProgress } from './hooks/useProgress'
import { exportAsPdf, exportAsText } from './utils/exportDoc'

export default function App() {
  const {
    currentStep,
    checks,
    notes,
    setCurrentStep,
    toggleAction,
    setNote,
    resetProgress,
    progress,
  } = useProgress()

  const step = steps.find((s) => s.number === currentStep) || steps[0]
  const isFirst = currentStep === 1
  const isLast = currentStep === steps.length

  const handleReset = () => {
    if (window.confirm('Reset all progress, checklists, and notes? This cannot be undone.')) {
      resetProgress()
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar__progress">
          <div className="topbar__meta">
            <span className="eyebrow">Overall progress</span>
            <strong>{progress.percent}%</strong>
            <span className="topbar__count">
              {progress.done} of {progress.total} actions
            </span>
          </div>
          <div className="progress-track" role="progressbar" aria-valuenow={progress.percent} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-fill" style={{ width: `${progress.percent}%` }} />
          </div>
        </div>
        <div className="topbar__actions">
          <button type="button" className="btn btn--ghost" onClick={() => exportAsText({ checks, notes, progress })}>
            Export text
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => exportAsPdf({ checks, notes, progress })}>
            Export PDF
          </button>
          <button type="button" className="btn btn--ghost btn--danger" onClick={handleReset}>
            Reset progress
          </button>
        </div>
      </header>

      <div className="layout">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          stepCompletion={progress.stepCompletion}
          onSelect={setCurrentStep}
        />

        <main className="main-panel" key={step.number}>
          <div className="main-panel__intro">
            <span className="eyebrow">Stage {step.number} of {steps.length}</span>
            <h2 className="main-panel__title">{step.title}</h2>
            <p className="main-panel__tagline">{step.tagline}</p>
            <div className="gold-rule" />
            <p className="main-panel__description">{step.description}</p>
          </div>

          <FrameworkDiagram
            visual={step.frameworkVisual}
            name={step.frameworkName}
            detail={step.frameworkDetail}
          />

          <div className="main-panel__grid">
            <ActionChecklist
              actions={step.actions}
              checks={checks[step.number]}
              onToggle={(index) => toggleAction(step.number, index)}
            />
            <ExpertTip
              insight={step.insight}
              mistake={step.mistake}
              shortcut={step.shortcut}
            />
          </div>

          <section className="notes">
            <h3 className="section-heading">Your notes</h3>
            <div className="gold-rule gold-rule--short" />
            <textarea
              className="notes__input"
              rows={4}
              placeholder="Capture reflections, decisions, or next moves for this stage…"
              value={notes[step.number] || ''}
              onChange={(e) => setNote(step.number, e.target.value)}
            />
          </section>

          <nav className="pager" aria-label="Step navigation">
            <button
              type="button"
              className="btn btn--outline"
              disabled={isFirst}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </button>
            <span className="pager__status">
              {step.number} / {steps.length}
            </span>
            <button
              type="button"
              className="btn btn--solid"
              disabled={isLast}
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </button>
          </nav>
        </main>
      </div>
    </div>
  )
}
