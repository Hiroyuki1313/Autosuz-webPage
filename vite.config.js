import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { getAutosFromDB } from './server/db.js';

function autosApiPlugin() {
  return {
    name: 'autosuz-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/autos', async (req, res, next) => {
        if (req.method !== 'GET') return next();
        try {
          const autos = await getAutosFromDB();
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, count: autos.length, data: autos }));
        } catch (err) {
          console.error('Error in /api/autos middleware:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), autosApiPlugin()]
});
