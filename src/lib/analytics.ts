export type CtaAction = 'call' | 'text' | 'directions' | 'email' | 'inquiry_submit';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const IS_DEV = import.meta.env.DEV;

let initialized = false;
let scriptLoaded = false;
const eventQueue: Array<() => void> = [];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function flushEventQueue() {
  if (!scriptLoaded) return;
  while (eventQueue.length > 0) {
    eventQueue.shift()?.();
  }
}

function runWhenReady(fn: () => void) {
  if (scriptLoaded && window.gtag) {
    fn();
    return;
  }
  eventQueue.push(fn);
}

function logDev(message: string) {
  if (IS_DEV && MEASUREMENT_ID) {
    console.info(`[analytics] ${message}`);
  }
}

export function initAnalytics() {
  if (initialized || !MEASUREMENT_ID || typeof window === 'undefined') {
    if (IS_DEV && !MEASUREMENT_ID) {
      console.warn('[analytics] VITE_GA_MEASUREMENT_ID is not set — tracking disabled');
    }
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  script.onload = () => {
    scriptLoaded = true;
    logDev('GA4 script loaded');
    flushEventQueue();
  };
  script.onerror = () => {
    console.warn('[analytics] Failed to load GA4 script — check ad blockers or network');
  };
  document.head.appendChild(script);

  initialized = true;
  logDev('initialized');
}

export function trackPageView(path: string) {
  if (!MEASUREMENT_ID) return;

  runWhenReady(() => {
    window.gtag?.('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
    logDev(`page_view ${path}`);
  });
}

export function trackCta(action: CtaAction, placement: string) {
  if (!MEASUREMENT_ID) return;

  runWhenReady(() => {
    window.gtag?.('event', `cta_${action}`, {
      placement,
      transport_type: 'beacon',
    });
    logDev(`cta_${action} (${placement})`);
  });
}
