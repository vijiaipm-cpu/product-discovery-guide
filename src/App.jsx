import { useState, useEffect, useRef, useCallback } from 'react'
import ProgressHeader from './components/ProgressHeader'
import Section1 from './components/Section1'
import Section2 from './components/Section2'
import Section3 from './components/Section3'
import Section4 from './components/Section4'
import Section5 from './components/Section5'
import Section6 from './components/Section6'
import { initPostHog, trackEvent, Events } from './lib/analytics'

// Generate a session ID for this user
const userSession = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

export default function App() {
  const [completedSections, setCompletedSections] = useState(new Set())
  const [activeSection, setActiveSection] = useState(1)
  const trackedSections = useRef(new Set())

  const sectionRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
    5: useRef(null),
    6: useRef(null),
  }

  useEffect(() => {
    initPostHog()
  }, [])

  // Scroll tracking for active section & auto-complete on view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = parseInt(entry.target.dataset.section)
          if (entry.isIntersecting) {
            setActiveSection(id)
            // Track section view once
            if (!trackedSections.current.has(id)) {
              trackedSections.current.add(id)
              trackEvent(Events.SECTION_VIEWED, { section: id })
            }
            // Auto-complete sections 1, 2, 4, 5 on view
            if ([1, 2, 4, 5].includes(id)) {
              setCompletedSections(prev => new Set([...prev, id]))
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current) {
        ref.current.dataset.section = id
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [])

  const completeSection = useCallback((sectionId) => {
    setCompletedSections(prev => new Set([...prev, sectionId]))
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans">
      <ProgressHeader completedSections={completedSections} activeSection={activeSection} />

      {/* Content with top padding for fixed header */}
      <main className="pt-16">
        <Section1 sectionRef={sectionRefs[1]} />
        <Section2 sectionRef={sectionRefs[2]} />
        <Section3
          sectionRef={sectionRefs[3]}
          userSession={userSession}
          onComplete={() => completeSection(3)}
        />
        <Section4
          sectionRef={sectionRefs[4]}
          userSession={userSession}
        />
        <Section5 sectionRef={sectionRefs[5]} />
        <Section6
          sectionRef={sectionRefs[6]}
          userSession={userSession}
          onComplete={() => completeSection(6)}
        />

        {/* Footer */}
        <footer className="border-t border-gray-100 py-12 px-6 text-center">
          <p className="text-sm text-gray-400 font-light">
            Built for aspiring product managers.{' '}
            <span className="text-purple-500">Keep discovering.</span>
          </p>
        </footer>
      </main>
    </div>
  )
}
