// Service Worker Registration for UbayHub PWA Capability

export function registerServiceWorker() {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[UbayHub PWA] ServiceWorker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('[UbayHub PWA] ServiceWorker registration failed:', error);
        });
    });
  } else if ('serviceWorker' in navigator) {
    // Also register in dev mode for testing PWA capabilities
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[UbayHub PWA Dev] ServiceWorker registered:', registration.scope);
        })
        .catch((err) => {
          console.warn('[UbayHub PWA Dev] ServiceWorker registration note:', err);
        });
    });
  }
}
