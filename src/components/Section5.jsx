import { useState } from 'react'
import { useIntersection } from '../lib/hooks'

const mistakes = [
  {
    id: 1,
    emoji: '💬',
    topic: 'The Question Trap',
    before: {
      label: 'Asking what users want',
      text: '"What features do you want in our app?"',
      detail: 'Users will tell you what they think they want — not what they actually need. They\'re not product designers. Asking for feature requests leads to feature bloat.',
      tag: 'Wishful thinking'
    },
    after: {
      label: 'Asking what users struggle with',
      text: '"What\'s the most frustrating part of your current workflow?"',
      detail: 'This reveals real pain points you can actually solve. The solution might not be a feature at all — it could be better onboarding, a simpler flow, or just better documentation.',
      tag: 'Root cause thinking'
    }
  },
  {
    id: 2,
    emoji: '🚢',
    topic: 'The Secrecy Trap',
    before: {
      label: 'Building in secret',
      text: '"We\'ll show users once it\'s perfect."',
      detail: 'By the time you ship, you\'ve spent months building something that might completely miss the mark. "Perfect" is expensive. Discovery is cheap.',
      tag: 'Expensive mistake'
    },
    after: {
      label: 'Testing early with prototypes',
      text: '"Here\'s a rough mockup — does this solve your problem?"',
      detail: 'A Figma prototype, a landing page, even a hand-drawn sketch can validate your direction in days. Fail fast, learn cheap, iterate toward what works.',
      tag: 'Learning early'
    }
  },
  {
    id: 3,
    emoji: '🎯',
    topic: 'The Assumption Trap',
    before: {
      label: 'Assuming you know the user',
      text: '"I\'m the target user. I know exactly what they need."',
      detail: 'Even if you were once the target user, you\'re not anymore. You have the curse of knowledge. Your intuitions bias your decisions in ways you can\'t see.',
      tag: 'Founder\'s blindspot'
    },
    after: {
      label: 'Letting data surprise you',
      text: '"I thought I knew — but the interviews said otherwise."',
      detail: 'The best PMs keep a "surprise log" — moments when user research contradicted their assumptions. Each surprise is worth thousands of dollars in avoided waste.',
      tag: 'Evidence-based'
    }
  }
]

function MistakeCard({ mistake, index, isVisible }) {
  const [showAfter, setShowAfter] = useState(false)
  const current = showAfter ? mistake.after : mistake.before

  return (
    <div
      className={`mistake-card transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="p-7">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{mistake.emoji}</span>
            <div>
              <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-0.5">Common Mistake</p>
              <h3 className="font-semibold text-gray-900">{mistake.topic}</h3>
            </div>
          </div>
          {/* Toggle */}
          <button
            onClick={() => setShowAfter(!showAfter)}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              showAfter
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-600'
            }`}
          >
            <span className={`w-5 h-3 rounded-full relative transition-colors duration-300 ${showAfter ? 'bg-emerald-500' : 'bg-red-400'}`}>
              <span className={`absolute top-0.5 w-2 h-2 rounded-full bg-white shadow transition-all duration-300 ${showAfter ? 'left-2.5' : 'left-0.5'}`} />
            </span>
            {showAfter ? 'Better way' : 'Mistake'}
          </button>
        </div>

        <div className={`rounded-2xl p-5 transition-all duration-400 ${showAfter ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
          <div className="flex items-center justify-between mb-3">
            <p className={`text-xs font-mono uppercase tracking-widest ${showAfter ? 'text-emerald-500' : 'text-red-400'}`}>
              {current.label}
            </p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${showAfter ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
              {current.tag}
            </span>
          </div>
          <p className={`font-medium italic mb-3 ${showAfter ? 'text-emerald-800' : 'text-red-800'}`}>
            {current.text}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">{current.detail}</p>
        </div>
      </div>
    </div>
  )
}

export default function Section5({ sectionRef }) {
  const [titleRef, titleVisible] = useIntersection()
  const [cardsRef, cardsVisible] = useIntersection()

  return (
    <section
      id="section-5"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="section-bg-number">05</div>
      <div className="max-w-5xl mx-auto">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-xs font-mono tracking-[0.2em] text-purple-600 uppercase mb-6 px-3 py-1.5 bg-purple-50 rounded-full border border-purple-100">
            Watch out
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-gray-900 mb-5 tracking-tight">
            Common Mistakes
          </h2>
          <p className="text-gray-500 text-lg font-light">
            Toggle each card to see the mistake vs. the better approach.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mistakes.map((mistake, i) => (
            <MistakeCard key={mistake.id} mistake={mistake} index={i} isVisible={cardsVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
