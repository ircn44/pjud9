<template>
  <v-app theme="dark">
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
/* Importaciones base de Vuetify y MDI (si las tenías así) */
// @import 'vuetify/styles';
// @import '@mdi/font/css/materialdesignicons.css';
// En tu archivo app.vue, dentro de <style lang="scss">

// ... (tus estilos existentes como :root, .v-application, etc.)

// CSS para el efecto de botón líquido
.btn.liquid-effect { // Renombré a liquid-effect para evitar colisiones con clases 'btn' genéricas de Vuetify
  position: relative;
  padding: 0.8rem 1.8rem; // Ajustado ligeramente para que no sea tan grande como el original
  font-size: 0.9rem;    // Ajustado ligeramente
  font-weight: 600;
  color: var(--custom-beige-text); // Color de texto inicial
  background: none;
  border: 2px solid var(--custom-orange-accent); // Usando tu color de acento para el borde
  border-radius: 8px; // Puedes ajustarlo o usar el de Vuetify si prefieres
  cursor: pointer;
  overflow: hidden;
  transition: color 0.3s ease, background-position 0.3s ease; // Transición para el color de texto y fondo
  text-transform: none; // Para asegurar que no se ponga en mayúsculas por defecto de v-btn
  letter-spacing: normal; // Resetea el espaciado de letras
  line-height: normal; // Asegura altura de línea normal
  
  // Importante: Para que v-btn no imponga su propio fondo y padding que interfiera
  &.v-btn--variant-text .v-btn__overlay,
  &.v-btn--variant-flat .v-btn__overlay {
    display: none;
  }
   &.v-btn { // Para sobreescribir padding de v-btn si es necesario
    padding-left: 1.8rem !important;
    padding-right: 1.8rem !important;
    height: auto !important; // Permite que el padding vertical defina la altura
  }
}

.btn.liquid-effect.liquid {
  // El fondo es el color de tu acento
  background: linear-gradient(var(--custom-orange-accent) 0 0) no-repeat calc(200% - var(--p, 0%))
    100% / 200% var(--p, 0.2em);
  transition: 0.3s var(--t, 0s), // Transición para el color del texto
    background-position 0.3s calc(0.3s - var(--t, 0s)); // Transición para la posición del fondo
}

.btn.liquid-effect.liquid:hover {
  --p: 100%; // Hace que el fondo cubra el botón
  --t: 0.3s;  // Tiempo para la transición del color de texto
  color: white; // Cambia el color del texto a blanco cuando el fondo naranja entra
}

// El estilo para 'body' que proporcionaste es para la página de demostración general.
// No es necesario para el botón en sí y ya tienes tus estilos globales para el fondo de la app.
// font-family: "Inter", sans-serif; // Ya tienes tu propia configuración de fuente.
// En tu archivo app.vue, dentro de <style lang="scss">

// ... (tus estilos existentes)

@keyframes vuetifyPulseEffect { // Nombre cambiado para evitar colisiones
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.01); // Puedes ajustar este valor para la intensidad del pulso
  }
  100% {
    transform: scale(1);
  }
}

// Clase específica para aplicar solo la animación de pulso a un v-btn
.v-btn.apply-pulse-effect {
  animation: vuetifyPulseEffect 1.0s infinite;
  // No se define background-color, color, padding, border aquí.
  // Esto permite que el v-btn mantenga sus estilos de Vuetify (color, variant, etc.)
  // y solo se le añada la animación.
}
// Variables de color personalizadas
:root {
  --custom-dark-bg: #292929; // Tu gris oscuro preferido
  --custom-beige-text: #b9b9b9; // Beige/gris muy claro para texto
  --custom-orange-accent: #bd6b35; // Naranja sobrio
  --custom-orange-accent-darken: #B85F2A; // Un tono más oscuro para hover/active
}

// Sobrescribir colores base de Vuetify para el tema oscuro si es necesario,
// o aplicar directamente a v-main si no usas theme="dark".
.v-application {
  background-color: var(--custom-dark-bg) !important;
  color: var(--custom-beige-text) !important;

  // Ajustar el color de los links si es necesario
  a {
    color: var(--custom-orange-accent);
  }
}

// Estilos para los componentes de Vuetify que quieras afectar globalmente
// Por ejemplo, el color de fondo de los v-card
.v-card {
  // Si quieres que las tarjetas tengan un fondo ligeramente diferente al principal
  // background-color: #3E4248 !important; // Un gris un poco más claro que el fondo principal
}

// Mejorar el color de texto de los inputs y labels para mayor contraste
.v-text-field input, .v-select .v-select__selection, .v-label, .v-checkbox .v-label {
  color: var(--custom-beige-text) !important;
}
.v-text-field .v-label--active {
  color: var(--custom-orange-accent) !important;
}
.v-input--is-focused .v-label {
   color: var(--custom-orange-accent) !important;
}
.v-text-field .v-input__details .v-messages__message { // Mensajes de error/ayuda
  color: #FF8A65 !important; // Un naranja/rojo claro para errores
}

// Color de los checkboxes
.v-checkbox .v-icon {
  color: var(--custom-beige-text) !important;
}
.v-checkbox--on .v-icon {
  color: var(--custom-orange-accent) !important;
}

// Estilo para los títulos h1, h2 que usamos
h1.text-h5, h2.text-h5 {
  color: var(--custom-beige-text) !important;
}
h3.text-subtitle-1 {
  color: #645b5b !important; // Un gris un poco más oscuro para subtítulos
}
</style>