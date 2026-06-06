const sectionNames = [
  'Why Discovery?',
  '4 Core Questions',
  'User Interviews',
  'Frameworks',
  'Common Mistakes',
  'Discovery Plan',
]

export default function ProgressHeader({ completedSections, activeSection }) {
  const scrollTo = (i) => {
    const el = document.getElementById(`section-${i + 1}`)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-purple-700 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1l1.8 3.5 3.8.6-2.8 2.7.7 3.9L7 9.8l-3.5 1.9.7-3.9L1.4 5.1l3.8-.6L7 1z" fill="white"/>
              </svg>
            </div>
            <span className="font-semibold text-gray-900 text-sm tracking-tight">Product Discovery</span>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {sectionNames.map((name, i) => {
              const completed = completedSections.has(i + 1)
              const active = activeSection === i + 1
              return (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  title={name}
                  className="group relative flex items-center justify-center"
                >
                  <div className={`transition-all duration-300 rounded-full ${
                    completed
                      ? 'w-3 h-3 bg-purple-700'
                      : active
                      ? 'w-3 h-3 bg-purple-300 ring-2 ring-purple-200'
                      : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'
                  }`} />
                  {/* Tooltip */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap">
                      {name}
                    </div>
                    <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1" />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Count */}
          <div className="text-xs font-mono text-gray-400">
            {completedSections.size}<span className="text-gray-200">/6</span>
          </div>
        </div>
      </div>
    </header>
  )
}
