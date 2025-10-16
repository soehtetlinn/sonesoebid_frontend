declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

const ADS_CLIENT = 'ca-pub-6435175773777013';
const MIN_WORDS = 150;

export function hasEnoughContent(containerSelector: string = '#main-content', minWords: number = MIN_WORDS): boolean {
  const element = document.querySelector(containerSelector);
  if (!element) return false;
  const text = (element as HTMLElement).innerText.trim();
  if (!text) return false;
  const words = text.split(/\s+/).filter(Boolean).length;
  return words >= minWords;
}

export function ensureAdsScriptLoaded(): void {
  if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) return;
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT}`;
  document.head.appendChild(script);
}

export function enableAds(): void {
  document.querySelectorAll('.adsbygoogle').forEach((el) => {
    (el as HTMLElement).style.display = '';
  });
}

export function disableAds(): void {
  document.querySelectorAll('.adsbygoogle').forEach((el) => {
    (el as HTMLElement).style.display = 'none';
  });
}

export function fillAdsIfContentful(): void {
  if (!hasEnoughContent()) return;
  ensureAdsScriptLoaded();
  const slots = document.querySelectorAll('.adsbygoogle:not([data-filled])');
  slots.forEach((slot) => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      (slot as HTMLElement).setAttribute('data-filled', '1');
    } catch (_) {
      /* ignore */
    }
  });
}

export function shouldAllowAdsForPath(pathname: string): boolean {
  // Allow on content-heavy, public-facing routes only
  const disallowedPrefixes = [
    '/admin',
    '/dashboard',
    '/disputes',
    '/cart',
    '/messages',
  ];
  if (disallowedPrefixes.some((p) => pathname.startsWith(p))) return false;
  // Allow on home, products, product details, news detail; gate news list until populated
  if (pathname === '/' || pathname.startsWith('/products') || pathname.startsWith('/product/')) return true;
  if (pathname.startsWith('/news/')) return true; // detail pages
  if (pathname === '/news') return false; // likely thin list until articles exist
  return true;
}


