export default function ExpertTip({ insight, mistake, shortcut }) {
  return (
    <aside className="expert-tip" aria-label="Expert tip">
      <h3 className="expert-tip__heading">Expert Tip</h3>
      <div className="gold-rule gold-rule--short" />
      <ul className="expert-tip__list">
        <li className="tip tip--insight">
          <span className="tip__label">Insight</span>
          <p>{insight}</p>
        </li>
        <li className="tip tip--mistake">
          <span className="tip__label">Mistake</span>
          <p>{mistake}</p>
        </li>
        <li className="tip tip--shortcut">
          <span className="tip__label">Shortcut</span>
          <p>{shortcut}</p>
        </li>
      </ul>
    </aside>
  )
}
