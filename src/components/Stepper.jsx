const stepIcons = {
  1: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
      <path d="M12 8l2 4h-4l2-4z" fill="currentColor" stroke="none" />
    </svg>
  ),
  2: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="9" cy="11" r="4.5" />
      <circle cx="15" cy="11" r="4.5" />
      <circle cx="12" cy="15" r="4.5" />
    </svg>
  ),
  3: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 5h16l-4 7H8L4 5z" />
      <path d="M9 14h6l-2 5h-2l-2-5z" />
    </svg>
  ),
  4: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="5" y="4" width="14" height="4" />
      <rect x="5" y="10" width="14" height="4" />
      <rect x="5" y="16" width="14" height="4" />
    </svg>
  ),
  5: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 4a8 8 0 1 1-7.5 5.2" />
      <path d="M12 4v4l3-1" />
    </svg>
  ),
  6: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <path d="M8.5 12h1M14.5 12h1" />
    </svg>
  ),
}

export default function Stepper({ steps, currentStep, stepCompletion, onSelect }) {
  return (
    <nav className="stepper" aria-label="Career design stages">
      <div className="stepper__brand">
        <p className="eyebrow">Career Design System</p>
        <h1 className="stepper__logo">CEO Path</h1>
        <div className="gold-rule" />
        <p className="stepper__tagline">Six stages from clarity to legacy</p>
      </div>

      <ol className="stepper__list">
        {steps.map((step) => {
          const status = stepCompletion[step.number]
          const isActive = currentStep === step.number
          const stateClass = isActive
            ? 'is-active'
            : status.done
              ? 'is-done'
              : status.started
                ? 'is-started'
                : ''

          return (
            <li key={step.number}>
              <button
                type="button"
                className={`stepper__item ${stateClass}`}
                onClick={() => onSelect(step.number)}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="stepper__icon">{stepIcons[step.number]}</span>
                <span className="stepper__text">
                  <span className="stepper__number">Stage {step.number}</span>
                  <span className="stepper__title">{step.title}</span>
                </span>
                <span className="stepper__check" aria-hidden="true">
                  {status.done ? '✓' : `${status.completed}/${status.total}`}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
