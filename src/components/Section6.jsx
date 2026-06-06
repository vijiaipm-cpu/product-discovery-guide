import { useState } from 'react'
import { useIntersection } from '../lib/hooks'
import { saveProgress } from '../lib/supabaseClient'
import { trackEvent, Events } from '../lib/analytics'

const steps = [
  {
    id: 1,
    title: 'Define your riskiest assumption',
    detail: 'What one belief, if wrong, would kill your idea? Write it down explicitly.',
  },
  {
    id: 2,
    title: 'Write 5 interview questions',
    detail: 'Open-ended, past-behavior focused. No leading questions. Have a teammate review them.',
  },
  {
    id: 3,
    title: 'Recruit 5–8 target users',
    detail: 'LinkedIn, Slack communities, friends-of-friends. Aim for diversity within your target profile.',
  },
  {
    id: 4,
    title: 'Run your interviews (30 min each)',
    detail: 'Record with permission. Take notes in real time. Thank them and ask for referrals.',
  },
  {
    id: 5,
    title: 'Synthesize your findings',
    detail: 'Look for patterns across 3+ interviews. Note surprises. Update your assumption list.',
  },
  {
    id: 6,
    title: 'Write your problem statement',
    detail: 'Use the "How Might We" format. Share it with your team. Get alignment before building.',
  },
  {
    id: 7,
    title: 'Test one solution concept',
    detail: 'A landing page, a Figma prototype, or even a 1-slide pitch. Get one real reaction.',
  },
]

export default function Section6({ sectionRef, userSession, onComplete }) {
  const [titleRef, titleVisible] = useIntersection()
  const [stepsRef, stepsVisible] = useIntersection()
  const [checked, setChecked] = useState({})
  const [saved, setSaved] = useState(false)

  const checkedCount = Object.values(checked).filter(Boolean).length
  const allChecked = checkedCount === steps.length

  const handleCheck = async (id) => {
    const newChecked = { ...checked, [id]: !checked[id] }
    setChecked(newChecked)
    const allDone = Object.values(newChecked).filter(Boolean).length === steps.length
    if (allDone && !saved) {
      setSaved(true)
      await saveProgress(userSession, 'section_6_checklist')
      trackEvent(Events.DISCOVERY_BADGE_EARNED)
      trackEvent(Events.CHECKLIST_COMPLETED, { section: 6 })
      onComplete()
    }
  }

  return (
    <section
      id="section-6"
      ref={sectionRef}
      className="relative py-32 px-6 bg-gray-50/50 overflow-hidden"
    >
      <div className="section-bg-number">06</div>
      <div className="max-w-3xl mx-auto">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-xs font-mono tracking-[0.2em] text-purple-600 uppercase mb-6 px-3 py-1.5 bg-purple-50 rounded-full border border-purple-100">
            Action plan
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900 mb-5 tracking-tight">
            Your First Discovery Sprint
          </h2>
          <p className="text-gray-500 text-lg font-light">
            7 steps to go from idea to validated problem in one week.
          </p>

          {/* Progress bar */}
          <div className="mt-8 max-w-xs mx-auto">
            <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
              <span>{checkedCount} of {steps.length} steps</span>
              <span>{Math.round((checkedCount / steps.length) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${(checkedCount / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div ref={stepsRef} className="space-y-3">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`step-item transition-all duration-700 ${stepsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <button
                onClick={() => handleCheck(step.id)}
                className="w-full flex items-start gap-5 p-6 text-left group"
              >
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    checked[step.id]
                      ? 'bg-purple-700 border-purple-700'
                      : 'border-gray-200 bg-white group-hover:border-purple-300'
                  }`}>
                    {checked[step.id] ? (
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5l4 4 6-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <span className={`text-xs font-mono font-semibold transition-colors ${checked[step.id] ? 'text-white' : 'text-gray-400'}`}>
                        {step.id}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <p className={`font-semibold transition-all duration-200 ${checked[step.id] ? 'text-gray-300 line-through' : 'text-gray-900'}`}>
                    {step.title}
                  </p>
                  <p className="text-sm text-gray-400 mt-1 leading-relaxed">{step.detail}</p>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Completion Badge */}
        {allChecked && (
          <div className="mt-12 text-center animate-fade-up">
            <div className="inline-block">
              <div className="completion-badge">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-display text-2xl font-bold text-purple-900 mb-2">Discovery Ready!</h3>
                <p className="text-purple-600 text-sm leading-relaxed max-w-xs mx-auto">
                  You've completed your first discovery sprint plan.
                  You're now more prepared than 90% of first-time PMs.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-mono text-purple-500">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1l1.5 3 3.2.5-2.3 2.3.5 3.2L6 8.5 3.1 10l.5-3.2L1.3 4.5l3.2-.5L6 1z" fill="#7c3aed"/>
                  </svg>
                  Progress saved to your account
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
