export const navigateTo = (url: string) => {
  if (url.includes('#')) {
    const [, hash] = url.split('#');
    window.history.pushState({}, '', url);
    window.dispatchEvent(new Event('popstate'));

    setTimeout(() => {
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
    return;
  }

  window.history.pushState({}, '', url);
  window.dispatchEvent(new Event('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
