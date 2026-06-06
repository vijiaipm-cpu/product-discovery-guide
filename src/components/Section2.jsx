import { useState } from 'react'
import { useIntersection } from '../lib/hooks'

const questions = [
  {
    id: 1,
    emoji: '👤',
    question: 'Who is our user?',
    short: 'Define exactly who you\'re building for — not everyone.',
    example: 'Not "busy professionals." Try: "Freelance designers aged 25–35 who juggle 3+ clients and use Google Calendar but hate that it doesn\'t integrate with their invoicing tool."',
    color: 'from-blue-50 to-indigo-50',
    accent: 'text-blue-700',
    border: 'border-blue-100',
  },
  {
    id: 2,
    emoji: '🔍',
    question: 'What problem are we solving?',
    short: 'Name the pain precisely. Vague problems breed vague solutions.',
    example: '"Our users waste 40 minutes every Monday manually copy-pasting invoices from Notion into QuickBooks — and they hate it so much they just delay invoicing for days."',
    color: 'from-violet-50 to-purple-50',
    accent: 'text-violet-700',
    border: 'border-violet-100',
  },
  {
    id: 3,
    emoji: '💡',
    question: 'Why does this problem matter?',
    short: 'Connect the pain to real consequence. Stakes make solutions worth building.',
    example: '"Delayed invoicing means they get paid 3–4 weeks late on average. At $5K/month revenue, that\'s a consistent $1,200 cash flow gap hitting them every single month."',
    color: 'from-amber-50 to-orange-50',
    accent: 'text-amber-700',
    border: 'border-amber-100',
  },
  {
    id: 4,
    emoji: '✅',
    question: 'How do we know this is real?',
    short: 'Gut feelings are hypotheses. Evidence makes them facts.',
    example: '"We interviewed 12 freelancers. 9 of 12 described the exact same copy-paste behavior unprompted. 4 had already built spreadsheet workarounds. This isn\'t an edge case."',
    color: 'from-emerald-50 to-teal-50',
    accent: 'text-emerald-700',
    border: 'border-emerald-100',
  },
]

function QuestionCard({ q, index, isVisible }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`question-card transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <button
        className="w-full text-left p-6 md:p-8 group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-2xl">{q.emoji}</span>
            <div>
              <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-1">Question {q.id}</p>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight">{q.question}</h3>
            </div>
          </div>
          <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 border-purple-200 flex items-center justify-center transition-all duration-300 ${expanded ? 'bg-purple-700 border-purple-700 rotate-45' : 'bg-white'}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2v8M2 6h8" stroke={expanded ? 'white' : '#7c3aed'} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <p className="mt-3 ml-14 text-gray-500 leading-relaxed">{q.short}</p>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className={`mx-6 md:mx-8 mb-6 p-5 rounded-2xl bg-gradient-to-br ${q.color} border ${q.border}`}>
          <p className={`text-xs font-mono tracking-widest uppercase mb-3 ${q.accent}`}>Real example</p>
          <p className="text-gray-700 leading-relaxed italic">"{q.example}"</p>
        </div>
      </div>
    </div>
  )
}

export default function Section2({ sectionRef }) {
  const [titleRef, titleVisible] = useIntersection()
  const [cardsRef, cardsVisible] = useIntersection()

  return (
    <section
      id="section-2"
      ref={sectionRef}
      className="relative py-32 px-6 bg-gray-50/50 overflow-hidden"
    >
      <div className="section-bg-number">02</div>
      <div className="max-w-3xl mx-auto">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-xs font-mono tracking-[0.2em] text-purple-600 uppercase mb-6 px-3 py-1.5 bg-purple-50 rounded-full border border-purple-100">
            The foundation
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900 mb-5 tracking-tight">
            The 4 Core Questions
          </h2>
          <p className="text-gray-500 text-lg font-light">
            Every great product discovery starts here. Click each to explore.
          </p>
        </div>

        <div ref={cardsRef} className="space-y-3">
          {questions.map((q, i) => (
            <QuestionCard key={q.id} q={q} index={i} isVisible={cardsVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
