import { useCallback, useEffect, useMemo, useState } from 'react'
import { STORAGE_KEY, steps } from '../data/steps'

function emptyChecks() {
  return Object.fromEntries(steps.map((step) => [step.number, Array(step.actions.length).fill(false)]))
}

function emptyNotes() {
  return Object.fromEntries(steps.map((step) => [step.number, '']))
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { currentStep: 1, checks: emptyChecks(), notes: emptyNotes() }
    }
    const parsed = JSON.parse(raw)
    return {
      currentStep: parsed.currentStep ?? 1,
      checks: { ...emptyChecks(), ...parsed.checks },
      notes: { ...emptyNotes(), ...parsed.notes },
    }
  } catch {
    return { currentStep: 1, checks: emptyChecks(), notes: emptyNotes() }
  }
}

export function useProgress() {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const setCurrentStep = useCallback((number) => {
    setState((prev) => ({ ...prev, currentStep: number }))
  }, [])

  const toggleAction = useCallback((stepNumber, actionIndex) => {
    setState((prev) => {
      const stepChecks = [...(prev.checks[stepNumber] || [])]
      stepChecks[actionIndex] = !stepChecks[actionIndex]
      return {
        ...prev,
        checks: { ...prev.checks, [stepNumber]: stepChecks },
      }
    })
  }, [])

  const setNote = useCallback((stepNumber, value) => {
    setState((prev) => ({
      ...prev,
      notes: { ...prev.notes, [stepNumber]: value },
    }))
  }, [])

  const resetProgress = useCallback(() => {
    const next = { currentStep: 1, checks: emptyChecks(), notes: emptyNotes() }
    setState(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const progress = useMemo(() => {
    const total = steps.reduce((sum, step) => sum + step.actions.length, 0)
    const done = steps.reduce((sum, step) => {
      const checks = state.checks[step.number] || []
      return sum + checks.filter(Boolean).length
    }, 0)
    const percent = total === 0 ? 0 : Math.round((done / total) * 100)

    const stepCompletion = Object.fromEntries(
      steps.map((step) => {
        const checks = state.checks[step.number] || []
        const completed = checks.filter(Boolean).length
        return [
          step.number,
          {
            completed,
            total: step.actions.length,
            done: completed === step.actions.length && step.actions.length > 0,
            started: completed > 0,
          },
        ]
      }),
    )

    return { done, total, percent, stepCompletion }
  }, [state.checks])

  return {
    currentStep: state.currentStep,
    checks: state.checks,
    notes: state.notes,
    setCurrentStep,
    toggleAction,
    setNote,
    resetProgress,
    progress,
  }
}
