import { useEffect, useState } from 'react';
import { getFallbackDataForPath } from '../lib/fallbackData';

export function useApi<T>(path: string) {
  const fallback = getFallbackDataForPath<T>(path);
  const [data, setData] = useState<T[]>(fallback || []);
  const [loading, setLoading] = useState(!fallback);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    if (!fallback) setLoading(true);

    fetch(path)
      .then(async (r) => {
        if (!r.ok) throw new Error(`Request failed (${r.status})`);
        const contentType = r.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          if (fallback) return fallback;
          throw new Error('Response was not JSON');
        }
        return r.json();
      })
      .then((d) => {
        if (alive) {
          if (Array.isArray(d) && d.length > 0) {
            setData(d);
          } else if (fallback) {
            setData(fallback);
          }
          setLoading(false);
        }
      })
      .catch((e) => {
        if (alive) {
          if (fallback) {
            setData(fallback);
          } else {
            setError(String(e?.message || e));
          }
          setLoading(false);
        }
      });

    return () => {
      alive = false;
    };
  }, [path]);

  return { data, loading, error };
}

