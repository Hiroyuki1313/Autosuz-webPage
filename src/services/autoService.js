/**
 * Service to fetch autos from MySQL backend (/api/autos)
 */
export async function fetchAutos() {
  try {
    const response = await fetch('/api/autos');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    if (result && result.success && Array.isArray(result.data)) {
      return result.data;
    }
    throw new Error('Respuesta de API inválida');
  } catch (error) {
    console.warn('No se pudo conectar a la base de datos MySQL en vivo:', error.message);
    throw error;
  }
}
