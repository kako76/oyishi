import { useEffect } from 'react';
import { useWebContent } from './useWebContent';

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
}

export function useSEO({ title: defaultTitle, description: defaultDescription, path }: SEOProps) {
  const { config } = useWebContent();
  
  const title = (path === '/' || path === undefined) && config?.seo?.title ? config.seo.title : defaultTitle;
  const description = (path === '/' || path === undefined) && config?.seo?.description ? config.seo.description : defaultDescription;
  const ogTitle = (path === '/' || path === undefined) && config?.seo?.ogTitle ? config.seo.ogTitle : title;

  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update OG & Twitter Title
    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute('content', ogTitle);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', ogTitle);

    // 3. Update Description
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) metaDescription.setAttribute('content', description);

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) ogDescription.setAttribute('content', description);

      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) twitterDescription.setAttribute('content', description);
    }

    // 4. Update Canonical URL
    if (path !== undefined) {
      const baseUrl = 'https://oyishi.es';
      const canonicalUrl = `${baseUrl}${path}`;

      // Update or create canonical link
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);

      // Update OG & Twitter URL
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

      const twitterUrl = document.querySelector('meta[name="twitter:url"]');
      if (twitterUrl) twitterUrl.setAttribute('content', canonicalUrl);
    }
  }, [title, description, path]);
}
