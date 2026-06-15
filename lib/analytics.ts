export function trackPageView(page: string, metadata: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      page,
      event_type: 'page_view',
      metadata: {
        ...metadata,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      },
    }),
  }).catch(() => {});
}

export function trackEvent(
  page: string,
  eventType: string,
  metadata: Record<string, unknown> = {}
) {
  if (typeof window === 'undefined') return;

  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      page,
      event_type: eventType,
      metadata,
    }),
  }).catch(() => {});
}
