import { createClient } from '@supabase/supabase-js';
import { triggerRestore } from './db-wake.js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let clientInstance = null;

if (!supabaseUrl) {
  console.error('[Server Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or VITE_SUPABASE_URL in server environment.');
} else if (!serviceRoleKey) {
  console.error('[Server Supabase] Missing SUPABASE_SERVICE_ROLE_KEY in server environment. Server API requires service-role credentials.');
} else {
  clientInstance = createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      global: {
        fetch: async (url, options) => {
          const res = await fetch(url, options);
          if (!res.ok && res.status >= 500) triggerRestore();
          return res;
        },
      },
    }
  );
}

// Export a proxy so module evaluation doesn't crash if SUPABASE_SERVICE_ROLE_KEY is absent at build/import time,
// while failing with a clear server-side configuration error when invoked.
const supabase = new Proxy({}, {
  get(_target, prop) {
    if (!clientInstance) {
      throw new Error(
        'Server configuration error: SUPABASE_SERVICE_ROLE_KEY is not configured in server environment. Please set this in your deployment dashboard.'
      );
    }
    const val = clientInstance[prop];
    return typeof val === 'function' ? val.bind(clientInstance) : val;
  },
});

export default supabase;

