import { useState } from 'react'
import { useIntersection } from '../lib/hooks'
import { saveProgress } from '../lib/supabaseClient'
import { trackEvent, Events } from '../lib/analytics'

const goldenRules = [
  { id: 1, rule: 'Ask about past behavior, not future intent', detail: '"When did you last…" not "Would you ever…"' },
  { id: 2, rule: 'Never pitch during the interview', detail: 'You\'re listening, not selling. The moment you pitch, the data becomes unreliable.' },
  { id: 3, rule: 'Embrace the silence', detail: 'Count to 5 after they finish. Most gold comes in the second half of the pause.' },
  { id: 4, rule: 'Follow the emotion', detail: 'When they sigh, lean forward, or use words like "always" and "never" — dig there.' },
  { id: 5, rule: 'End by asking who else to talk to', detail: '"Who else in your team deals with this?" — snowball your research.' },
]

export default function Section3({ sectionRef, userSession, onComplete }) {
  const [titleRef, titleVisible] = useIntersection()
  const [scriptsRef, scriptsVisible] = useIntersection()
  const [rulesRef, rulesVisible] = useIntersection()
  const [checked, setChecked] = useState({})
  const [saved, setSaved] = useState(false)

  const allChecked = Object.values(checked).filter(Boolean).length === goldenRules.length

  const handleCheck = async (id) => {
    const newChecked = { ...checked, [id]: !checked[id] }
    setChecked(newChecked)
    const allDone = Object.values(newChecked).filter(Boolean).length === goldenRules.length
    if (allDone && !saved) {
      setSaved(true)
      await saveProgress(userSession, 'section_3_checklist')
      trackEvent(Events.CHECKLIST_COMPLETED, { section: 3 })
      onComplete()
    }
  }

  return (
    <section
      id="section-3"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="section-bg-number">03</div>
      <div className="max-w-5xl mx-auto">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-xs font-mono tracking-[0.2em] text-purple-600 uppercase mb-6 px-3 py-1.5 bg-purple-50 rounded-full border border-purple-100">
            The craft
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900 mb-5 tracking-tight">
            How to Talk to Users
          </h2>
          <p className="text-gray-500 text-lg font-light">
            The best PMs aren't just good builders — they're exceptional listeners.
          </p>
        </div>

        {/* Interview Scripts */}
        <div
          ref={scriptsRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 transition-all duration-700 ${scriptsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Bad */}
          <div className="rounded-3xl border border-red-100 bg-red-50/50 p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-sm">✗</span>
              </div>
              <p className="font-semibold text-red-700 text-sm tracking-wide uppercase">Bad Interview</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 border border-red-100">
                <p className="text-xs text-red-400 font-mono mb-2">Question</p>
                <p className="text-gray-800">"Would you use this feature if we built it?"</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-red-100">
                <p className="text-xs text-red-400 font-mono mb-2">Question</p>
                <p className="text-gray-800">"Don't you think this would save you time?"</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-red-100">
                <p className="text-xs text-red-400 font-mono mb-2">Question</p>
                <p className="text-gray-800">"If we had feature X, would you pay for it?"</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-red-500 italic">Leading questions. You're fishing for validation, not truth.</p>
          </div>

          {/* Good */}
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <p className="font-semibold text-emerald-700 text-sm tracking-wide uppercase">Good Interview</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 border border-emerald-100">
                <p className="text-xs text-emerald-500 font-mono mb-2">Question</p>
                <p className="text-gray-800">"Tell me about the last time you struggled with X."</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-emerald-100">
                <p className="text-xs text-emerald-500 font-mono mb-2">Question</p>
                <p className="text-gray-800">"Walk me through exactly what you did when that happened."</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-emerald-100">
                <p className="text-xs text-emerald-500 font-mono mb-2">Question</p>
                <p className="text-gray-800">"How are you dealing with that today?"</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-emerald-600 italic">Open-ended. Reveals actual behavior, not imagined preferences.</p>
          </div>
        </div>

        {/* Golden Rules */}
        <div ref={rulesRef}>
          <div className={`text-center mb-10 transition-all duration-700 ${rulesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-gray-900">
              5 Golden Rules of User Interviews
            </h3>
            {allChecked && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium animate-fade-in">
                <span>✓</span> All rules mastered — saved to your progress!
              </div>
            )}
          </div>

          <div className="space-y-3">
            {goldenRules.map((rule, i) => (
              <div
                key={rule.id}
                className={`rule-item transition-all duration-700 ${rulesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <button
                  onClick={() => handleCheck(rule.id)}
                  className="w-full flex items-start gap-4 p-5 text-left group"
                >
                  <div className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${checked[rule.id] ? 'bg-purple-700 border-purple-700' : 'border-gray-300 group-hover:border-purple-400'}`}>
                    {checked[rule.id] && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className={`font-medium transition-colors ${checked[rule.id] ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                      {rule.rule}
                    </p>
                    <p className="text-sm text-gray-400 mt-1 italic">{rule.detail}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
