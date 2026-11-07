const checkboxes=document.querySelectorAll('.servicio-checkbox');
const precioTotalTexto=document.getElementById('precioTotal');
const inputNombre =document.getElementById('nombre');
const selectEquipo=document.getElementById('tipoEquipo');
const btnWhatsApp= document.getElementById('btnEnviarWhatsApp');

function calcularTotal(){
    let total=0;
    checkboxes.forEach((checkbox)=>{
        if (checkbox.checked){
            total += parseInt(checkbox.value);
        }
    });
    precioTotalTexto.textContent=`$${total} MXN`;
}
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', calcularTotal);
});





btnWhatsApp.addEventListener('click', () => {
  const nombre = inputNombre.value.trim();
  const equipo = selectEquipo.value;

  /*validacion de datos*/

  if (nombre === '' || equipo === '') {
    alert('⚠️ Por favor ingresa tu nombre y selecciona el tipo de equipo antes de continuar.');
    return;
  }


  

  //obtener servicios seleccionados
  let serviciosSeleccionados = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      // Uso de  data-nombre desde el html
      serviciosSeleccionados.push(checkbox.getAttribute('data-nombre'));
    }
  });

  if (serviciosSeleccionados.length === 0) {
    alert('⚠️ Por favor selecciona al menos un servicio para cotizar.');
    return;
  }

  //construir mensaje whats
  const mensaje = `Hola NEXUSFORGE, mi nombre es ${nombre}. Me gustaría cotizar un servicio para mi ${equipo}.%0A%0AServicios de interés:%0A- ${serviciosSeleccionados.join('%0A- ')}`;

  // enlace al chat
  const urlWhatsApp = `https://api.whatsapp.com/send?phone=523330099381&text=${mensaje}`;
  window.open(urlWhatsApp, '_blank');
});

//fetch para el api y el uso de lainformacion mediante dom 
//random user con persona aleatoria /ubicacion /diseño de tarjetas animacion etc/ cursores 
