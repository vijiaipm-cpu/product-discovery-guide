import { useState } from 'react'
import { useIntersection } from '../lib/hooks'
import { saveExercise, saveProgress } from '../lib/supabaseClient'
import { trackEvent, Events } from '../lib/analytics'

function FiveWhysBuilder() {
  const [problem, setProblem] = useState('')
  const [whys, setWhys] = useState([])
  const [currentWhy, setCurrentWhy] = useState('')

  const addWhy = () => {
    if (!currentWhy.trim() || whys.length >= 5) return
    setWhys([...whys, currentWhy.trim()])
    setCurrentWhy('')
    trackEvent(Events.EXERCISE_SUBMITTED, { type: '5_whys', depth: whys.length + 1 })
  }

  const reset = () => {
    setProblem('')
    setWhys([])
    setCurrentWhy('')
  }

  const currentPrompt = whys.length === 0
    ? problem
    : whys[whys.length - 1]

  return (
    <div className="space-y-6">
      {/* Problem */}
      <div>
        <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">
          The Problem
        </label>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="e.g. Users are abandoning the checkout flow..."
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent resize-none font-sans text-sm leading-relaxed"
          rows={2}
          disabled={whys.length > 0}
        />
      </div>

      {/* Why chain */}
      {whys.length > 0 && (
        <div className="space-y-3">
          {/* Original problem */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <p className="text-xs font-mono text-gray-400 mb-1">Problem</p>
            <p className="text-gray-700 text-sm">{problem}</p>
          </div>

          {whys.map((why, i) => (
            <div key={i} className="relative">
              <div className="absolute left-8 -top-3 h-3 w-px bg-purple-200" />
              <div className="p-4 rounded-2xl border border-purple-100 bg-purple-50/50 ml-4">
                <p className="text-xs font-mono text-purple-400 mb-1">Why #{i + 1}</p>
                <p className="text-gray-800 text-sm">{why}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Next why input */}
      {problem && whys.length < 5 && (
        <div>
          <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">
            {whys.length === 0 ? 'Why does this happen?' : `Why #${whys.length + 1} — But why?`}
          </label>
          <div className="flex gap-2">
            <input
              value={currentWhy}
              onChange={(e) => setCurrentWhy(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addWhy()}
              placeholder={whys.length === 0 ? 'Because...' : 'Because...'}
              className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent font-sans text-sm"
            />
            <button
              onClick={addWhy}
              disabled={!currentWhy.trim()}
              className="px-4 py-3 rounded-2xl bg-purple-700 text-white font-medium text-sm hover:bg-purple-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Add Why {whys.length + 1}
            </button>
          </div>
        </div>
      )}

      {whys.length === 5 && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
          <p className="text-emerald-700 font-medium text-sm">🎯 You've reached the root cause!</p>
          <p className="text-emerald-600 text-xs mt-1">This is where the real solution lives.</p>
        </div>
      )}

      {(problem || whys.length > 0) && (
        <button
          onClick={reset}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          ↩ Start over
        </button>
      )}
    </div>
  )
}

function ProblemStatementBuilder({ userSession }) {
  const [action, setAction] = useState('')
  const [user, setUser] = useState('')
  const [outcome, setOutcome] = useState('')
  const [generated, setGenerated] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const generate = () => {
    if (!action || !user || !outcome) return
    setGenerated(`How might we ${action} for ${user} so that ${outcome}?`)
    setSaved(false)
  }

  const submit = async () => {
    if (!generated || saved) return
    setSaving(true)
    await saveExercise(generated)
    await saveProgress(userSession, 'problem_statement')
    trackEvent(Events.EXERCISE_SUBMITTED, { type: 'problem_statement' })
    setSaved(true)
    setSaving(false)
  }

  return (
    <div className="space-y-5">
      <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-100">
        <p className="text-purple-700 font-medium text-sm mb-1">The Template</p>
        <p className="text-gray-600 font-mono text-sm leading-relaxed">
          "How might we <span className="text-purple-600 font-semibold">[action]</span> for{' '}
          <span className="text-purple-600 font-semibold">[user]</span> so that{' '}
          <span className="text-purple-600 font-semibold">[outcome]</span>?"
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-1.5">Action</label>
          <input value={action} onChange={e => setAction(e.target.value)}
            placeholder="e.g. simplify the invoicing process"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-gray-300" />
        </div>
        <div>
          <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-1.5">User</label>
          <input value={user} onChange={e => setUser(e.target.value)}
            placeholder="e.g. freelance designers"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-gray-300" />
        </div>
        <div>
          <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-1.5">Outcome</label>
          <input value={outcome} onChange={e => setOutcome(e.target.value)}
            placeholder="e.g. they get paid faster and spend less time on admin"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-gray-300" />
        </div>
      </div>

      <button
        onClick={generate}
        disabled={!action || !user || !outcome}
        className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Generate Statement
      </button>

      {generated && (
        <div className="p-5 rounded-2xl border-2 border-purple-200 bg-white">
          <p className="text-xs font-mono text-purple-500 uppercase tracking-widest mb-2">Your Problem Statement</p>
          <p className="text-gray-900 font-medium leading-relaxed italic">"{generated}"</p>
          <button
            onClick={submit}
            disabled={saved || saving}
            className={`mt-4 w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
              saved
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                : 'bg-purple-700 text-white hover:bg-purple-800'
            }`}
          >
            {saving ? 'Saving...' : saved ? '✓ Saved to your exercises' : 'Save Statement'}
          </button>
        </div>
      )}
    </div>
  )
}

export default function Section4({ sectionRef, userSession }) {
  const [titleRef, titleVisible] = useIntersection()
  const [frameworksRef, frameworksVisible] = useIntersection()

  return (
    <section
      id="section-4"
      ref={sectionRef}
      className="relative py-32 px-6 bg-gray-50/50 overflow-hidden"
    >
      <div className="section-bg-number">04</div>
      <div className="max-w-5xl mx-auto">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-xs font-mono tracking-[0.2em] text-purple-600 uppercase mb-6 px-3 py-1.5 bg-purple-50 rounded-full border border-purple-100">
            Interactive
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900 mb-5 tracking-tight">
            Frameworks in Practice
          </h2>
          <p className="text-gray-500 text-lg font-light">
            Learn by doing. These exercises help you internalize the tools.
          </p>
        </div>

        <div
          ref={frameworksRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ${frameworksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* 5 Whys */}
          <div className="framework-card">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🔎</span>
                <h3 className="text-xl font-semibold text-gray-900">5 Whys Builder</h3>
              </div>
              <p className="text-sm text-gray-400 mb-7 leading-relaxed">
                Peel back assumptions by asking why five times. Each why reveals a deeper root cause.
              </p>
              <FiveWhysBuilder />
            </div>
          </div>

          {/* Problem Statement */}
          <div className="framework-card">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">✍️</span>
                <h3 className="text-xl font-semibold text-gray-900">Problem Statement Builder</h3>
              </div>
              <p className="text-sm text-gray-400 mb-7 leading-relaxed">
                The "How Might We" format aligns your team on what you're actually solving.
              </p>
              <ProblemStatementBuilder userSession={userSession} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
