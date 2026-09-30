import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAutosFromDB } from './server/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
  console.log(`Autosuz Backend API running on http://localhost:${PORT}`);
});
