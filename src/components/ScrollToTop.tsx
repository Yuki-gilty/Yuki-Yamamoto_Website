import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, try to scroll to the anchor; otherwise, scroll to top.
    if (hash) {
      // Wait a tick for the route component to mount.
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      });
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}




