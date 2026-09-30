import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const HOSTINGER_ASSET_BASE = 'https://autosuzcuu.com';

// Pool configuration for MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'srv1987.hstgr.io',
  user: process.env.DB_USER || 'u984618457_autosuzdb1',
  password: process.env.DB_PASSWORD || '|PKIJAov5',
  database: process.env.DB_NAME || 'u984618457_AutosuzDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000
});

// Category mapping helper
function mapCategory(rawTipo) {
  const t = (rawTipo || '').toLowerCase().trim();
  switch (t) {
    case 'suv':
      return 'SUV';
    case 'sedan':
      return 'Sedán';
    case 'camion':
    case 'pickup':
      return 'Pickup';
    case 'hatchback':
      return 'Hatchback';
    default:
      return 'Otros';
  }
}

// Fallback images per category if auto has no photos uploaded yet
const FALLBACK_IMAGES = {
  SUV: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
  Sedán: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
  Pickup: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80',
  Hatchback: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
  Otros: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
};

/**
 * Fetch all autos from MySQL where estado_logico is not in ('venta', 'frio')
 */
export async function getAutosFromDB() {
  const query = `
    SELECT 
      id, marca, modelo, anio, tipo, version, kilometraje, 
      color, precio_publicacion, precio_objetivo, precio_min_autorizado,
      estado_logico, fotos_url, fecha_creacion
    FROM autos 
    WHERE estado_logico IS NOT NULL 
      AND estado_logico NOT IN ('venta', 'frio')
    ORDER BY id DESC
  `;

  const [rows] = await pool.query(query);

  return rows.map((auto) => {
    const marca = (auto.marca || '').trim();
    const modelo = (auto.modelo || '').trim();
    const version = (auto.version || '').trim();
    const title = version ? `${marca} ${modelo} ${version}` : `${marca} ${modelo}`;
    const category = mapCategory(auto.tipo);

    // Calculate price
    let rawPrice = parseFloat(auto.precio_publicacion);
    if (!rawPrice || rawPrice <= 0) {
      rawPrice = parseFloat(auto.precio_objetivo) || 0;
    }

    // Parse fotos_url (can be JSON array string or array or null)
    let photos = [];
    if (auto.fotos_url) {
      if (Array.isArray(auto.fotos_url)) {
        photos = auto.fotos_url;
      } else if (typeof auto.fotos_url === 'string') {
        try {
          const parsed = JSON.parse(auto.fotos_url);
          if (Array.isArray(parsed)) {
            photos = parsed;
          } else if (typeof parsed === 'string') {
            photos = [parsed];
          }
        } catch {
          // If not valid JSON, treat as comma-separated or single string
          photos = auto.fotos_url.split(',').map((s) => s.trim()).filter(Boolean);
        }
      }
    }

    // Normalize each photo URL to full URL
    const normalizedPhotos = photos
      .map((url) => {
        if (!url || typeof url !== 'string') return null;
        let clean = url.trim();
        if (clean.startsWith('//')) return `https:${clean}`;
        if (clean.startsWith('/')) return `${HOSTINGER_ASSET_BASE}${clean}`;
        return clean;
      })
      .filter(Boolean);

    // If no photos, use a high quality fallback
    const finalPhotos = normalizedPhotos.length > 0
      ? normalizedPhotos
      : [FALLBACK_IMAGES[category] || FALLBACK_IMAGES.Otros];

    const hasRealPhotos = normalizedPhotos.length > 0;

    return {
      id: auto.id,
      marca,
      modelo,
      version,
      title,
      year: auto.anio,
      category,
      rawCategory: auto.tipo,
      price: rawPrice,
      monthlyFrom: rawPrice > 0 ? Math.round(rawPrice * 0.0185) : 0,
      mileage: auto.kilometraje ? `${Number(auto.kilometraje).toLocaleString('es-MX')} km` : 'No especificado',
      color: auto.color || 'No especificado',
      status: auto.estado_logico === 'inventario' ? 'Disponible' : auto.estado_logico,
      photos: finalPhotos,
      image: finalPhotos[0], // primary photo
      photosCount: finalPhotos.length,
      hasRealPhotos,
      features: [
        `Año ${auto.anio} • Categoría ${category}`,
        auto.kilometraje ? `${Number(auto.kilometraje).toLocaleString('es-MX')} km originales` : 'Revisión técnica completa',
        auto.color ? `Color exterior: ${auto.color}` : 'Inspección de pintura y carrocería',
        'Garantía por escrito Autosuz CUU',
        'Revisión mecánica en orden'
      ]
    };
  });
}

export default pool;
