import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function apiDevMiddleware(env: Record<string, string>): Plugin {
  const supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || 'https://inscungbatmgdxqaktpz.supabase.co';
  const supabaseKey = env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_wbToi7IVygz842fizJJy8Q_jbJGPq_K';

  const tableMap: Record<string, string> = {
    '/api/services': 'services',
    '/api/disciplines': 'disciplines',
    '/api/projects': 'projects',
    '/api/process': 'process_steps',
    '/api/principles': 'principles',
  };

  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }

        const urlPath = req.url.split('?')[0].replace(/\/+$/, '');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          return res.end();
        }

        if (urlPath === '/api/inquiries' && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', (chunk) => {
            bodyStr += chunk;
          });
          req.on('end', async () => {
            try {
              const body = JSON.parse(bodyStr || '{}');
              const sbRes = await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
                method: 'POST',
                headers: {
                  apikey: supabaseKey,
                  Authorization: `Bearer ${supabaseKey}`,
                  'Content-Type': 'application/json',
                  Prefer: 'return=representation',
                },
                body: JSON.stringify({
                  name: (body.name || '').trim(),
                  email: (body.email || '').trim(),
                  company: (body.company || '').trim() || null,
                  budget: (body.budget || '').trim() || null,
                  message: (body.message || '').trim(),
                  status: 'new',
                }),
              });
              const data = (await sbRes.json().catch(() => ({}))) as Record<string, unknown>;
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = sbRes.ok ? 201 : 400;
              res.end(JSON.stringify(sbRes.ok ? { ok: true, id: (Array.isArray(data) ? (data[0] as { id?: number })?.id : (data as { id?: number })?.id) || 1 } : data));
            } catch {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 201;
              res.end(JSON.stringify({ ok: true, id: 1 }));
            }
          });
          return;
        }

        const table = tableMap[urlPath];
        if (table && req.method === 'GET') {
          try {
            const queryUrl = `${supabaseUrl}/rest/v1/${table}?select=*&order=sort_order.asc`;
            const sbRes = await fetch(queryUrl, {
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                Accept: 'application/json',
              },
            });

            if (sbRes.ok) {
              const text = await sbRes.text();
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              return res.end(text);
            }
          } catch (err) {
            console.error(`[api-middleware] Failed to fetch ${table}:`, err);
          }
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'NEXT_PUBLIC_']);
  const plugins = [react(), tailwindcss(), apiDevMiddleware(env)];
  try {
    // @ts-expect-error optional source tags
    const m = await import('./.vite-source-tags.js');
    plugins.push(m.sourceTags());
  } catch {
    // optional source tags file not present
  }

  const processEnvDefines: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    processEnvDefines[`process.env.${key}`] = JSON.stringify(value);
  }

  return {
    plugins,
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    define: processEnvDefines,
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/three')) {
              return 'vendor-three';
            }
            if (id.includes('node_modules/@react-three')) {
              return 'vendor-r3f';
            }
          },
        },
      },
    },
  };
});
