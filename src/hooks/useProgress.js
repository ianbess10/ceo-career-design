import { useCallback, useEffect, useMemo, useState } from 'react'
import { ONBOARDING_KEY, STORAGE_KEY, CELEBRATION_KEY, steps } from '../data/steps'

function emptyChecks() {
  return Object.fromEntries(steps.map((step) => [step.number, Array(step.actions.length).fill(false)]))
}

function emptyNotes() {
  return Object.fromEntries(steps.map((step) => [step.number, '']))
}

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function loadState() {
  const parsed = safeParse(localStorage.getItem(STORAGE_KEY), null)
  if (!parsed) {
    return { currentStep: 1, checks: emptyChecks(), notes: emptyNotes() }
  }

  const checks = { ...emptyChecks() }
  steps.forEach((step) => {
    const saved = parsed.checks?.[step.number]
    if (Array.isArray(saved)) {
      checks[step.number] = step.actions.map((_, i) => Boolean(saved[i]))
    }
  })

  const notes = { ...emptyNotes() }
  steps.forEach((step) => {
    notes[step.number] = typeof parsed.notes?.[step.number] === 'string' ? parsed.notes[step.number] : ''
  })

  const currentStep = steps.some((s) => s.number === parsed.currentStep)
    ? parsed.currentStep
    : 1

  return { currentStep, checks, notes }
}

export function useProgress() {
  const [state, setState] = useState(loadState)
  const [showOnboarding, setShowOnboarding] = useState(
    () => localStorage.getItem(ONBOARDING_KEY) !== 'done',
  )
  const [celebrationDismissed, setCelebrationDismissed] = useState(
    () => localStorage.getItem(CELEBRATION_KEY) === 'dismissed',
  )
  const [celebrationSeenThisSession, setCelebrationSeenThisSession] = useState(false)
  const [storageError, setStorageError] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      setStorageError(null)
    } catch {
      setStorageError('Progress could not be saved in this browser (storage may be full or blocked).')
    }
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
    setCelebrationSeenThisSession(false)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      localStorage.removeItem(CELEBRATION_KEY)
      setCelebrationDismissed(false)
      setStorageError(null)
    } catch {
      setStorageError('Progress could not be saved in this browser (storage may be full or blocked).')
    }
  }, [])

  const resetStep = useCallback((stepNumber) => {
    setState((prev) => {
      const step = steps.find((s) => s.number === stepNumber)
      if (!step) return prev
      return {
        ...prev,
        checks: {
          ...prev.checks,
          [stepNumber]: Array(step.actions.length).fill(false),
        },
        notes: {
          ...prev.notes,
          [stepNumber]: '',
        },
      }
    })
    setCelebrationSeenThisSession(false)
  }, [])

  const completeOnboarding = useCallback((options = {}) => {
    localStorage.setItem(ONBOARDING_KEY, 'done')
    setShowOnboarding(false)
    if (options.goToStart) {
      setState((prev) => ({ ...prev, currentStep: 1 }))
    }
  }, [])

  const reopenOnboarding = useCallback(() => {
    setShowOnboarding(true)
  }, [])

  const dismissCelebration = useCallback(() => {
    setCelebrationSeenThisSession(true)
  }, [])

  const dismissCelebrationForever = useCallback(() => {
    localStorage.setItem(CELEBRATION_KEY, 'dismissed')
    setCelebrationDismissed(true)
    setCelebrationSeenThisSession(true)
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
            started: completed > 0 || Boolean((state.notes[step.number] || '').trim()),
          },
        ]
      }),
    )

    return { done, total, percent, complete: done === total && total > 0, stepCompletion }
  }, [state.checks, state.notes])

  const showCelebration =
    progress.complete && !celebrationDismissed && !celebrationSeenThisSession

  return {
    currentStep: state.currentStep,
    checks: state.checks,
    notes: state.notes,
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
  }
}
