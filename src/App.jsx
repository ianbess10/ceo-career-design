import { useEffect } from 'react'
import ActionChecklist from './components/ActionChecklist'
import CompletionBanner from './components/CompletionBanner'
import ExpertTip from './components/ExpertTip'
import FrameworkDiagram from './components/FrameworkDiagram'
import OnboardingModal from './components/OnboardingModal'
import Stepper from './components/Stepper'
import { steps } from './data/steps'
import { useProgress } from './hooks/useProgress'
import { exportAsPdf, exportAsText, printCareerDoc } from './utils/exportDoc'

export default function App() {
  const {
    currentStep,
    checks,
    notes,
    setCurrentStep,
    toggleAction,
    setNote,
    resetProgress,
    resetStep,
    progress,
    showOnboarding,
    completeOnboarding,
    reopenOnboarding,
    showCelebration,
    dismissCelebration,
    dismissCelebrationForever,
    storageError,
  } = useProgress()

  const step = steps.find((s) => s.number === currentStep) || steps[0]
  const isFirst = currentStep === 1
  const isLast = currentStep === steps.length
  const stepStatus = progress.stepCompletion[step.number]
  const stepHasProgress = stepStatus?.started || stepStatus?.completed > 0

  useEffect(() => {
    document.title = `Stage ${step.number}: ${step.title} · CEO Career Design`
  }, [step])

  const handleResetAll = () => {
    if (window.confirm('Reset all progress, checklists, and notes? This cannot be undone.')) {
      resetProgress()
    }
  }

  const handleResetStep = () => {
    if (
      window.confirm(
        `Reset Stage ${step.number} (“${step.title}”)? Checked actions and notes for this stage will be cleared.`,
      )
    ) {
      resetStep(step.number)
    }
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {storageError && (
        <div className="banner banner--warn" role="status">
          {storageError}
        </div>
      )}

      <header className="topbar">
        <div className="topbar__progress">
          <div className="topbar__meta">
            <span className="eyebrow">Overall progress</span>
            <strong aria-live="polite">{progress.percent}%</strong>
            <span className="topbar__count">
              {progress.done} of {progress.total} actions
              {progress.complete ? ' · complete' : ''}
            </span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Overall checklist progress"
            aria-valuenow={progress.percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="progress-fill" style={{ width: `${progress.percent}%` }} />
          </div>
        </div>
        <div className="topbar__actions">
          <button type="button" className="btn btn--ghost" onClick={reopenOnboarding}>
            How it works
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => exportAsText({ checks, notes, progress })}
          >
            Export text
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => exportAsPdf({ checks, notes, progress })}
          >
            Export PDF
          </button>
          <button type="button" className="btn btn--ghost" onClick={printCareerDoc}>
            Print
          </button>
          <button type="button" className="btn btn--ghost btn--danger" onClick={handleResetAll}>
            Reset all
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

        <main id="main-content" className="main-panel" key={step.number} tabIndex={-1}>
          <div className="main-panel__intro">
            <div className="main-panel__heading-row">
              <span className="eyebrow">
                Stage {step.number} of {steps.length}
                {stepStatus?.done ? ' · done' : ''}
              </span>
              <button
                type="button"
                className="btn btn--ghost btn--compact"
                onClick={handleResetStep}
                disabled={!stepHasProgress}
                aria-label={`Reset stage ${step.number}`}
              >
                Reset stage
              </button>
            </div>
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
              stepNumber={step.number}
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

          <section className="notes" aria-labelledby={`notes-heading-${step.number}`}>
            <h3 className="section-heading" id={`notes-heading-${step.number}`}>
              Your notes
            </h3>
            <div className="gold-rule gold-rule--short" />
            <label className="sr-only" htmlFor={`notes-${step.number}`}>
              Notes for stage {step.number}
            </label>
            <textarea
              id={`notes-${step.number}`}
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
            <span className="pager__status" aria-live="polite">
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

      <section className="print-doc" aria-hidden="true">
        <h1>CEO Career Design Doc</h1>
        <p>
          Overall progress: {progress.percent}% ({progress.done}/{progress.total} actions)
          {' · '}
          {progress.complete ? 'Complete' : 'In progress'}
        </p>
        {steps.map((s) => {
          const stepChecks = checks[s.number] || []
          return (
            <article key={s.number} className="print-doc__stage">
              <h2>
                Stage {s.number}: {s.title}
              </h2>
              <p>
                <em>{s.tagline}</em>
              </p>
              <p>
                Framework: {s.frameworkName} · {stepChecks.filter(Boolean).length}/
                {s.actions.length} actions
              </p>
              <ul>
                {s.actions.map((action, i) => (
                  <li key={action}>
                    [{stepChecks[i] ? 'x' : ' '}] {action}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Notes:</strong> {(notes[s.number] || '').trim() || '(none)'}
              </p>
              <p>
                <strong>Insight:</strong> {s.insight}
              </p>
              <p>
                <strong>Mistake:</strong> {s.mistake}
              </p>
              <p>
                <strong>Shortcut:</strong> {s.shortcut}
              </p>
            </article>
          )
        })}
      </section>

      <OnboardingModal
        open={showOnboarding}
        onStart={() => completeOnboarding({ goToStart: true })}
        onDismiss={() => completeOnboarding()}
      />

      <CompletionBanner
        open={showCelebration}
        onClose={dismissCelebration}
        onDismissForever={dismissCelebrationForever}
        checks={checks}
        notes={notes}
        progress={progress}
      />
    </div>
  )
}
