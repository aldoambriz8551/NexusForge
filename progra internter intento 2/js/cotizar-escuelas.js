// 1. Seleccionamos los elementos del DOM
const inputNumEquipos = document.getElementById('numEquipos');
const selectTipoServicio = document.getElementById('tipoServicio');
const precioEscuelasTexto = document.getElementById('precioEscuelas');
const descuentoTexto = document.getElementById('descuentoTexto');
const formEscuelas = document.getElementById('formEscuelas');
const inputEscuela = document.getElementById('nombreEscuela');
const inputContacto = document.getElementById('contacto');
const inputCorreo = document.getElementById('correoEscuela');

// Precios base por computadora según el servicio
const preciosPorEquipo = {
  aceleracion: 450,
  trimestral: 300,
  semestral: 200,
  renovacion: 150
};

// 2. Función para calcular el precio
function calcularCotizacionEscolar() {
  const numEquipos = parseInt(inputNumEquipos.value) || 0;
  const servicio = selectTipoServicio.value;

  if (numEquipos <= 0 || !servicio) {
    precioEscuelasTexto.textContent = '$0 MXN';
    descuentoTexto.textContent = '';
    return;
  }

  const precioUnitario = preciosPorEquipo[servicio] || 0;
  let subtotal = numEquipos * precioUnitario;
  let porcentajeDescuento = 0;

  if (numEquipos >= 30) {
    porcentajeDescuento = 15;
  } else if (numEquipos >= 15) {
    porcentajeDescuento = 10;
  }

  const montoDescuento = subtotal * (porcentajeDescuento / 100);
  const totalFinal = subtotal - montoDescuento;

  precioEscuelasTexto.textContent = `$${totalFinal.toLocaleString()} MXN`;

  if (porcentajeDescuento > 0) {
    descuentoTexto.textContent = `🎉 ¡Descuento por volumen aplicado! (-${porcentajeDescuento}% por atender ${numEquipos} equipos).`;
  } else {
    descuentoTexto.textContent = '💡 Agrega 15 equipos o más para obtener un 10% de descuento institucional.';
  }
}

// 3. Escuchamos cambios para calcular el total
inputNumEquipos.addEventListener('input', calcularCotizacionEscolar);
selectTipoServicio.addEventListener('change', calcularCotizacionEscolar);

// 4. Envío directo a WhatsApp
formEscuelas.addEventListener('submit', (e) => {
  e.preventDefault();

  const escuela = inputEscuela.value.trim();
  const contacto = inputContacto.value.trim();
  const correo = inputCorreo.value.trim();
  const numEquipos = inputNumEquipos.value;
  const servicio = selectTipoServicio.options[selectTipoServicio.selectedIndex].text;
  const total = precioEscuelasTexto.textContent;

  /* validación básica */
  if (escuela === '' || contacto === '' || correo === '' || numEquipos === '' || selectTipoServicio.value === '') {
    alert('⚠️ Por favor completa todos los datos de la institución antes de continuar.');
    return;
  }

  /* construir mensaje de whats */
  const mensaje = `Hola NEXUSFORGE, soy ${contacto} de la institución ${escuela}.%0A%0AMe gustaría cotizar un servicio escolar:%0A- Equipos: ${numEquipos}%0A- Plan: ${servicio}%0A- Correo: ${correo}%0A- Estimado: ${total}`;

  /* enlace al chat */
  const urlWhatsApp = `https://api.whatsapp.com/send?phone=523330099381&text=${mensaje}`;
  window.open(urlWhatsApp, '_blank');
});