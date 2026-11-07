document.addEventListener('DOMContentLoaded', () => {
  const contenedorTestimonios = document.getElementById('testimonios-container');

  if (!contenedorTestimonios) return;

  async function obtenerTestimonios() {
    try {
      // 1. Fetch a la API de RandomUser (3 perfiles aleatorios)
      const respuesta = await fetch('https://randomuser.me/api/?results=7');
      const datos = await respuesta.json();
      const usuarios = datos.results;

      // Limpiar mensaje de carga del DOM
      contenedorTestimonios.innerHTML = '';

      // Comentarios de prueba contextualizados a NEXUSFORGE
      const comentarios = [
        "El servicio de mantenimiento preventivo dejó mi equipo impecable y súper rápido. ¡Totalmente recomendados!",
        "Optimizaron los laboratorios de cómputo en nuestra institución a un costo muy accesible. Excelente trabajo.",
        "Asesoría técnica de primera para la selección de componentes y ensamble de mi PC. Gran atención por WhatsApp.",
        "El soporte remoto fue rápido y eficiente. Resolvieron mi problema en minutos. ¡Gracias!",
        "La instalación de software y configuración de sistemas fue impecable. Muy profesionales.",
        "Recomiendo sus servicios de mantenimiento preventivo. Mi equipo funciona como nuevo.",
        "Excelente atención y asesoría técnica. Me ayudaron a elegir los mejores componentes para mi PC."
      ];

      // 2. Manipulación del DOM para construir e inyectar las tarjetas
      usuarios.forEach((usuario, i) => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-testimonio');

        const foto = usuario.picture.large;
        const nombre = `${usuario.name.first} ${usuario.name.last}`;
        const ubicacion = `${usuario.location.city}, ${usuario.location.country}`;
        const textoOpinion = comentarios[i] || "Excelente soporte técnico y atención profesional.";

        tarjeta.innerHTML = `
          <div class="avatar-wrapper">
            <img src="${foto}" alt="Foto de ${nombre}" class="avatar-img" />
          </div>
          <div class="testimonio-body">
            <h3>${nombre}</h3>
            <span class="ubicacion-tag">📍 ${ubicacion}</span>
            <p class="opinion">"${textoOpinion}"</p>
          </div>
        `;

        contenedorTestimonios.appendChild(tarjeta);
      });
    } catch (error) {
      console.error('Error al obtener datos de RandomUser:', error);
      contenedorTestimonios.innerHTML = '<p style="color: #ef4444;">No se pudieron cargar las opiniones.</p>';
    }
  }

  obtenerTestimonios();
});