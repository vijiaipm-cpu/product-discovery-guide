import posthog from 'posthog-js'

const posthogKey = import.meta.env.VITE_POSTHOG_API_KEY
const posthogHost = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com'

let initialized = false

export function initPostHog() {
  if (posthogKey && !initialized) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      capture_pageview: true,
    })
    initialized = true
  }
}

export function trackEvent(event, properties = {}) {
  if (initialized) {
    posthog.capture(event, properties)
  } else {
    console.log(`[PostHog Mock] Event: ${event}`, properties)
  }
}

export const Events = {
  SECTION_VIEWED: 'section_viewed',
  EXERCISE_SUBMITTED: 'exercise_submitted',
  CHECKLIST_COMPLETED: 'checklist_completed',
  DISCOVERY_BADGE_EARNED: 'discovery_badge_earned',
}
