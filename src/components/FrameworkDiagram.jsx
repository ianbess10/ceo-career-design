const stroke = '#8B6914'
const ink = '#2C2416'

function CompassDiagram() {
  return (
    <svg viewBox="0 0 280 200" className="w-full max-w-md mx-auto" aria-hidden="true">
      <circle cx="140" cy="100" r="62" fill="none" stroke={stroke} strokeWidth="1.5" />
      <circle cx="140" cy="100" r="38" fill="none" stroke={stroke} strokeWidth="1" strokeDasharray="3 3" />
      <line x1="140" y1="28" x2="140" y2="172" stroke={stroke} strokeWidth="1" />
      <line x1="68" y1="100" x2="212" y2="100" stroke={stroke} strokeWidth="1" />
      <polygon points="140,42 148,78 140,70 132,78" fill={ink} />
      <text x="140" y="22" textAnchor="middle" fontSize="11" fill={ink} fontFamily="Georgia, serif">
        Impact
      </text>
      <text x="230" y="104" textAnchor="start" fontSize="11" fill={ink} fontFamily="Georgia, serif">
        Serve
      </text>
      <text x="140" y="190" textAnchor="middle" fontSize="11" fill={ink} fontFamily="Georgia, serif">
        Life
      </text>
      <text x="50" y="104" textAnchor="end" fontSize="11" fill={ink} fontFamily="Georgia, serif">
        Problems
      </text>
    </svg>
  )
}

function VennDiagram() {
  return (
    <svg viewBox="0 0 320 220" className="w-full max-w-md mx-auto" aria-hidden="true">
      <circle cx="120" cy="95" r="58" fill="rgba(139,105,20,0.08)" stroke={stroke} strokeWidth="1.5" />
      <circle cx="200" cy="95" r="58" fill="rgba(139,105,20,0.08)" stroke={stroke} strokeWidth="1.5" />
      <circle cx="160" cy="145" r="58" fill="rgba(139,105,20,0.08)" stroke={stroke} strokeWidth="1.5" />
      <text x="95" y="80" textAnchor="middle" fontSize="10" fill={ink} fontFamily="Georgia, serif">
        Skills
      </text>
      <text x="225" y="80" textAnchor="middle" fontSize="10" fill={ink} fontFamily="Georgia, serif">
        Experience
      </text>
      <text x="160" y="185" textAnchor="middle" fontSize="10" fill={ink} fontFamily="Georgia, serif">
        Market
      </text>
      <text x="160" y="118" textAnchor="middle" fontSize="10" fill={ink} fontFamily="Georgia, serif" fontWeight="700">
        Leverage
      </text>
    </svg>
  )
}

function FunnelDiagram() {
  return (
    <svg viewBox="0 0 280 210" className="w-full max-w-md mx-auto" aria-hidden="true">
      <path d="M40 30 H240 L175 120 H105 Z" fill="none" stroke={stroke} strokeWidth="1.5" />
      <path d="M115 130 H165 L150 175 H130 Z" fill="rgba(139,105,20,0.12)" stroke={stroke} strokeWidth="1.5" />
      <text x="140" y="55" textAnchor="middle" fontSize="10" fill={ink} fontFamily="Georgia, serif">
        Many options
      </text>
      <text x="140" y="95" textAnchor="middle" fontSize="10" fill={ink} fontFamily="Georgia, serif">
        Score & filter
      </text>
      <text x="140" y="158" textAnchor="middle" fontSize="10" fill={ink} fontFamily="Georgia, serif">
        Few great
      </text>
      <text x="140" y="198" textAnchor="middle" fontSize="11" fill={ink} fontFamily="Georgia, serif" fontWeight="700">
        Your arena
      </text>
      <line x1="140" y1="175" x2="140" y2="185" stroke={stroke} strokeWidth="1.5" />
    </svg>
  )
}

function StackDiagram() {
  const layers = [
    { y: 40, label: 'Human edge' },
    { y: 90, label: 'AI power' },
    { y: 140, label: 'Systems' },
  ]
  return (
    <svg viewBox="0 0 280 210" className="w-full max-w-md mx-auto" aria-hidden="true">
      {layers.map((layer) => (
        <g key={layer.label}>
          <rect
            x="50"
            y={layer.y}
            width="180"
            height="38"
            rx="2"
            fill="rgba(139,105,20,0.08)"
            stroke={stroke}
            strokeWidth="1.5"
          />
          <text
            x="140"
            y={layer.y + 24}
            textAnchor="middle"
            fontSize="12"
            fill={ink}
            fontFamily="Georgia, serif"
          >
            {layer.label}
          </text>
        </g>
      ))}
      <text x="140" y="200" textAnchor="middle" fontSize="11" fill={ink} fontFamily="Georgia, serif" fontWeight="700">
        = Sustainable advantage
      </text>
    </svg>
  )
}

function LoopDiagram() {
  const nodes = [
    { x: 140, y: 28, label: 'Deliver' },
    { x: 220, y: 100, label: 'Trust' },
    { x: 140, y: 172, label: 'Opportunity' },
    { x: 60, y: 100, label: 'Reinvest' },
  ]
  return (
    <svg viewBox="0 0 280 210" className="w-full max-w-md mx-auto" aria-hidden="true">
      <ellipse cx="140" cy="105" rx="78" ry="62" fill="none" stroke={stroke} strokeWidth="1.5" />
      <path
        d="M190 55 Q210 70 205 90"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
        markerEnd="url(#arrow)"
      />
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={stroke} />
        </marker>
      </defs>
      {nodes.map((node) => (
        <g key={node.label}>
          <circle cx={node.x} cy={node.y} r="22" fill="#F7F1E3" stroke={stroke} strokeWidth="1.5" />
          <text
            x={node.x}
            y={node.y + 4}
            textAnchor="middle"
            fontSize="9"
            fill={ink}
            fontFamily="Georgia, serif"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function ChainDiagram() {
  const links = [
    { x: 30, label: 'Develop' },
    { x: 95, label: 'Share' },
    { x: 160, label: 'Impact' },
    { x: 225, label: 'Legacy' },
  ]
  return (
    <svg viewBox="0 0 300 140" className="w-full max-w-md mx-auto" aria-hidden="true">
      {links.map((link, i) => (
        <g key={link.label}>
          <rect
            x={link.x}
            y="48"
            width="48"
            height="36"
            rx="18"
            fill="rgba(139,105,20,0.08)"
            stroke={stroke}
            strokeWidth="1.5"
          />
          <text
            x={link.x + 24}
            y="70"
            textAnchor="middle"
            fontSize="9"
            fill={ink}
            fontFamily="Georgia, serif"
          >
            {link.label}
          </text>
          {i < links.length - 1 && (
            <line
              x1={link.x + 48}
              y1="66"
              x2={links[i + 1].x}
              y2="66"
              stroke={stroke}
              strokeWidth="1.5"
            />
          )}
        </g>
      ))}
      <text x="150" y="120" textAnchor="middle" fontSize="11" fill={ink} fontFamily="Georgia, serif">
        Impact that multiplies
      </text>
    </svg>
  )
}

const diagrams = {
  compass: CompassDiagram,
  venn: VennDiagram,
  funnel: FunnelDiagram,
  stack: StackDiagram,
  loop: LoopDiagram,
  chain: ChainDiagram,
}

export default function FrameworkDiagram({ visual, name, detail }) {
  const Diagram = diagrams[visual] || CompassDiagram

  return (
    <div className="framework-panel">
      <div className="framework-panel__header">
        <span className="eyebrow">Framework</span>
        <h3 className="framework-panel__title">{name}</h3>
        <p className="framework-panel__detail">{detail}</p>
      </div>
      <div className="framework-panel__diagram">
        <Diagram />
      </div>
    </div>
  )
}
