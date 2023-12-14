// Función para formatear un número como un valor en dólares sin decimales
function formatoDolar(numero) {
  // Crear una instancia de Intl.NumberFormat con el formato de moneda en dólares
  const formatoDolar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // Establecer el número mínimo de decimales a 0
    maximumFractionDigits: 0, // Establecer el número máximo de decimales a 0
  });

  // Devolver el número formateado
  return formatoDolar.format(numero);
}

// Ejemplo de uso
const numero = 12345;
const numeroFormateado = formatoDolar(numero);

console.log(numeroFormateado); // Mostrará "$1,234,567"
