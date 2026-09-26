export default function ActionChecklist({ actions, checks, onToggle, stepNumber }) {
  return (
    <section className="actions" aria-labelledby={`actions-heading-${stepNumber}`}>
      <h3 className="section-heading" id={`actions-heading-${stepNumber}`}>
        Actions
      </h3>
      <div className="gold-rule gold-rule--short" />
      <ul className="actions__list">
        {actions.map((action, index) => {
          const checked = Boolean(checks?.[index])
          const id = `action-${stepNumber}-${index}`
          return (
            <li key={action}>
              <label className={`actions__item ${checked ? 'is-checked' : ''}`} htmlFor={id}>
                <input
                  id={id}
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(index)}
                />
                <span className="actions__box" aria-hidden="true">
                  {checked ? '✓' : ''}
                </span>
                <span className="actions__text">{action}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
