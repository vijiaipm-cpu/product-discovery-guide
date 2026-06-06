import { useIntersection, useCountUp } from '../lib/hooks'

function StatCard({ value, suffix, label, delay, isActive }) {
  const count = useCountUp(value, 1800, isActive)
  return (
    <div
      className="stat-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="stat-number">
        {count}{suffix}
      </div>
      <p className="stat-label">{label}</p>
    </div>
  )
}

export default function Section1({ sectionRef }) {
  const [heroRef, heroVisible] = useIntersection()
  const [statsRef, statsVisible] = useIntersection()
  const [storyRef, storyVisible] = useIntersection()

  return (
    <section
      id="section-1"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 overflow-hidden"
    >
      {/* Background section number */}
      <div className="section-bg-number">01</div>

      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div
          ref={heroRef}
          className={`text-center mb-24 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block text-xs font-mono tracking-[0.2em] text-purple-600 uppercase mb-6 px-3 py-1.5 bg-purple-50 rounded-full border border-purple-100">
            Why it matters
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-semibold text-gray-900 leading-[1.05] mb-8 tracking-tight">
            Build the{' '}
            <em className="italic text-purple-700 not-italic" style={{ fontStyle: 'italic' }}>right thing,</em>
            <br />
            not just build
            <br />
            things right
          </h1>
          <p className="text-xl text-gray-500 max-w-xl mx-auto leading-relaxed font-light">
            Most products fail not because they're built badly —
            but because they solve the wrong problem entirely.
          </p>
        </div>

        {/* Stat Cards */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <StatCard
            value={42}
            suffix="%"
            label="of startups fail due to no market need"
            delay={0}
            isActive={statsVisible}
          />
          <StatCard
            value={1}
            suffix=" in 7"
            label="ideas succeed without structured discovery"
            delay={150}
            isActive={statsVisible}
          />
          <StatCard
            value={2}
            suffix="×"
            label="faster shipping for teams doing discovery"
            delay={300}
            isActive={statsVisible}
          />
        </div>

        {/* Horror Story */}
        <div
          ref={storyRef}
          className={`transition-all duration-700 delay-200 ${storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="horror-card">
            <div className="horror-card-inner">
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">📷</span>
                <div>
                  <p className="text-xs font-mono tracking-widest text-red-400 uppercase mb-3">A cautionary tale</p>
                  <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                    Kodak invented the digital camera in 1975 — 23 years before the iPhone.
                    But they never asked users how digital photography would change their behavior.
                    They assumed people still wanted physical prints.
                  </p>
                  <p className="mt-4 text-gray-500">
                    They filed for bankruptcy in 2012. The problem wasn't the technology.
                    It was that <strong className="text-gray-800">they never did discovery.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
