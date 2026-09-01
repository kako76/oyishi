import { useState, useEffect } from 'react';

// In-memory cache to avoid duplicate fetches across components
let cachedConfig: any = null;
let fetchPromise: Promise<any> | null = null;

export function useWebContent() {
  const [config, setConfig] = useState<any>(cachedConfig);
  const [isLoading, setIsLoading] = useState(!cachedConfig);

  useEffect(() => {
    if (cachedConfig) {
      setConfig(cachedConfig);
      setIsLoading(false);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = fetch('/api/web-content')
        .then(res => {
          if (!res.ok) throw new Error('API web-content failed');
          return res.json();
        })
        .then(data => {
          cachedConfig = data;
          return data;
        })
        .catch(err => {
          console.error('Error fetching web content, using defaults:', err);
          return null; // Keep null to signify fallback
        });
    }

    fetchPromise.then(data => {
      if (data) {
        setConfig(data);
      }
      setIsLoading(false);
    });
  }, []);

  return { config, isLoading };
}
