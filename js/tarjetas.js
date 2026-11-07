document.addEventListener('DOMContentLoaded', () => {
  const tarjetas = document.querySelectorAll('.flip-card');
  
  tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener('click', () => {
      // Alterna la clase 'girada' al hacer clic
      tarjeta.classList.toggle('girada');
    });
  });
});