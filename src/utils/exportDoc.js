import { steps } from '../data/steps'

function buildPlainText({ checks, notes, progress }) {
  const lines = [
    'CEO CAREER DESIGN DOC',
    '======================',
    `Overall progress: ${progress.percent}% (${progress.done}/${progress.total} actions)`,
    `Status: ${progress.complete ? 'Complete' : 'In progress'}`,
    `Exported: ${new Date().toLocaleString()}`,
    '',
  ]

  steps.forEach((step) => {
    const stepChecks = checks[step.number] || []
    const doneCount = stepChecks.filter(Boolean).length
    lines.push(`STAGE ${step.number}: ${step.title}`)
    lines.push(step.tagline)
    lines.push(`Framework: ${step.frameworkName}`)
    lines.push(`Stage progress: ${doneCount}/${step.actions.length}`)
    lines.push('Actions:')
    step.actions.forEach((action, i) => {
      lines.push(`  [${stepChecks[i] ? 'x' : ' '}] ${action}`)
    })
    const note = (notes[step.number] || '').trim()
    lines.push(`Notes: ${note || '(none)'}`)
    lines.push(`Insight: ${step.insight}`)
    lines.push(`Mistake to avoid: ${step.mistake}`)
    lines.push(`Shortcut: ${step.shortcut}`)
    lines.push('')
  })

  lines.push('— End of Career Design Doc —')
  return lines.join('\n')
}

export function exportAsText({ checks, notes, progress }) {
  const text = buildPlainText({ checks, notes, progress })
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'ceo-career-design-doc.txt'
  a.click()
  URL.revokeObjectURL(url)
}

export function printCareerDoc() {
  window.print()
}

export async function exportAsPdf({ checks, notes, progress }) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'letter' })
  const margin = 48
  const maxWidth = 516
  let y = margin

  const ensureSpace = (needed = 40) => {
    if (y + needed > 740) {
      doc.addPage()
      y = margin
    }
  }

  const rule = () => {
    ensureSpace(20)
    doc.setDrawColor(139, 105, 20)
    doc.setLineWidth(0.6)
    doc.line(margin, y, margin + maxWidth, y)
    y += 16
  }

  const write = (text, options = {}) => {
    const { size = 11, style = 'normal', gap = 14, color = '#2C2416' } = options
    doc.setFont('times', style)
    doc.setFontSize(size)
    doc.setTextColor(color)
    const lines = doc.splitTextToSize(text, maxWidth)
    lines.forEach((line) => {
      ensureSpace(gap + 4)
      doc.text(line, margin, y)
      y += gap
    })
  }

  write('CEO Career Design Doc', { size: 22, style: 'bold', gap: 20 })
  write('Six-stage framework from clarity to legacy', {
    size: 11,
    style: 'italic',
    gap: 14,
    color: '#6B5E4E',
  })
  rule()
  write(`Overall progress: ${progress.percent}% (${progress.done}/${progress.total} actions)`, {
    size: 11,
    gap: 14,
  })
  write(`Status: ${progress.complete ? 'Complete' : 'In progress'}`, { size: 11, gap: 14 })
  write(`Exported: ${new Date().toLocaleString()}`, { size: 10, gap: 20, color: '#6B5E4E' })

  steps.forEach((step, index) => {
    const stepChecks = checks[step.number] || []
    const doneCount = stepChecks.filter(Boolean).length
    if (index > 0) rule()
    write(`Stage ${step.number}: ${step.title}`, { size: 14, style: 'bold', gap: 16 })
    write(step.tagline, { size: 11, style: 'italic', gap: 14, color: '#6B5E4E' })
    write(`Framework: ${step.frameworkName}  ·  ${doneCount}/${step.actions.length} actions`, {
      size: 11,
      gap: 14,
    })
    write('Actions', { size: 11, style: 'bold', gap: 14 })
    step.actions.forEach((action, i) => {
      write(`${stepChecks[i] ? '[x]' : '[ ]'}  ${action}`, { size: 11, gap: 13 })
    })
    const note = (notes[step.number] || '').trim()
    write(`Notes: ${note || '(none)'}`, { size: 11, gap: 14 })
    write(`Insight: ${step.insight}`, { size: 11, gap: 13, color: '#2F5D3A' })
    write(`Mistake: ${step.mistake}`, { size: 11, gap: 13, color: '#8B3A2A' })
    write(`Shortcut: ${step.shortcut}`, { size: 11, gap: 18, color: '#2A4A7A' })
  })

  rule()
  write('End of Career Design Doc', { size: 10, style: 'italic', gap: 12, color: '#6B5E4E' })
  doc.save('ceo-career-design-doc.pdf')
}
