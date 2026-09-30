import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAutosFromDB } from './server/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(cors());
app.use(express.json());

// API endpoint to fetch catalog autos
app.get('/api/autos', async (req, res) => {
  try {
    const autos = await getAutosFromDB();
    res.json({
      success: true,
      count: autos.length,
      data: autos
    });
  } catch (error) {
    console.error('Error fetching autos from MySQL:', error);
    res.status(500).json({
      success: false,
      error: 'Error al consultar la base de datos de inventario'
    });
  }
});

// Serve frontend static build in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback to index.html for Single Page Application routes (Express 5 safe)
app.use((req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send('Autosuz Server running. Dist build pending or loading...');
    }
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Servidor activo en el puerto ${PORT} (host: ${HOST})`);
});
