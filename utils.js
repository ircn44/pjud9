// utils/dateFormatter.js (o similar)
export function formatDateToSpanish(dateString) {
  if (!dateString) return null; // dateString en formato YYYY-MM-DD o un objeto Date
  const date = new Date(dateString + 'T00:00:00'); // Asegurar que se interpreta como fecha local
  if (isNaN(date.getTime())) return null;

  const day = date.getDate();
  const month = date.toLocaleDateString('es-ES', { month: 'long' });
  const year = date.getFullYear();
  return `${day} de ${month} de ${year}`;
}