<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="2">
          <h2 class="mb-4 text-h5">Notifica expresamente</h2>

          <v-row dense align="center" class="mb-3">
            <v-col cols="12" sm="7">
              <v-menu
                v-model="menuFechaResolucionPrincipal"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="formattedFechaResolucionPrincipal"
                    label="Fecha resolución"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="props"
                    outlined
                    dense
                    hide-details 
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fechaResolucionPrincipal"
                  @update:modelValue="menuFechaResolucionPrincipal = false"
                  locale="es-ES"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="5">
              <v-text-field
                v-model="folioResolucionPrincipal"
                label="Folio"
                type="text"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>

          <v-select
            v-model="parteNotificada"
            :items="partesOptions"
            label="Quién se notifica"
            outlined
            dense
            class="mb-3"
            hide-details
          ></v-select>

          <v-select
            v-model="tipoDocumentoNotificado"
            :items="tipoDocumentoOptions"
            label="De qué se notifica"
            outlined
            dense
            class="mb-3"
            hide-details
          ></v-select>
          
          <v-row dense align="center" class="mb-3">
            <v-col cols="12" sm="7">
              <v-menu
                v-model="menuFechaDocumentoNotificado"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="formattedFechaDocumentoNotificado"
                    label="Fecha de la resolución a notificar"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="props"
                    outlined
                    dense
                    hide-details
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fechaDocumentoNotificado"
                  @update:modelValue="menuFechaDocumentoNotificado = false"
                  locale="es-ES"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="5">
              <v-text-field
                v-model="folioDocumentoNotificado"
                label="Folio" 
                type="text"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>

          <div class="mt-6 text-right">
            <v-btn 
              color="var(--custom-orange-accent)" variant="text" 
              @click="borrarCampos" 
              class="mr-2"
            >
              Borrar
            </v-btn>
            <v-btn color="var(--custom-orange-accent)" variant="text" :to="'/'">Volver</v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="2">
          <h2 class="mb-4 text-h5">Resolución</h2>
          <div
            ref="resolucionText"
            class="resolucion-texto mb-4"
            style="max-height: 400px; overflow-y: auto; border: 1px solid #444; padding: 10px; border-radius: 4px; white-space: pre-wrap;"
          >
            {{ generatedResolution }}
          </div>
          <div class="text-right">
            <v-tooltip v-model="tooltipVisible" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  @click="copyToClipboard"
                  color="var(--custom-orange-accent)"
                  variant="flat"
                  :disabled="!generatedResolution.trim()"
                >
                  Copiar
                </v-btn>
              </template>
              <span>Copiar al portapapeles</span>
            </v-tooltip>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// El script permanece igual que en la versión anterior
export default {
  name: 'NotificacionExpresaView',
  data() {
    return {
      menuFechaResolucionPrincipal: false,
      fechaResolucionPrincipal: null,
      folioResolucionPrincipal: '',
      
      parteNotificada: null, // v-model almacenará el 'value' (minúscula)
      partesOptions: [
        { title: 'Demandante', value: 'demandante' },
        { title: 'Demandado', value: 'demandado' },
      ],
      
      tipoDocumentoNotificado: null, // v-model almacenará el 'value' (minúscula)
      tipoDocumentoOptions: [
        { title: 'Prueba', value: 'prueba' },
        { title: 'Sentencia', value: 'sentencia' },
      ],
      
      menuFechaDocumentoNotificado: false,
      fechaDocumentoNotificado: null,
      folioDocumentoNotificado: '',

      tooltipVisible: false,
    };
  },
  computed: {
    formattedFechaResolucionPrincipal() {
      return this.formatDateToDisplay(this.fechaResolucionPrincipal);
    },
    formattedFechaDocumentoNotificado() {
      return this.formatDateToDisplay(this.fechaDocumentoNotificado);
    },
    generatedResolution() {
      const fechaPrincipalStr = this.fechaResolucionPrincipal 
        ? this.formatDateToLong(this.fechaResolucionPrincipal) 
        : 'XXXX de XXXX de XXXX';
      const folioPrincipalStr = this.folioResolucionPrincipal || 'XXX';

      // this.parteNotificada ya estará en minúscula si se selecciona.
      const parteStr = this.parteNotificada || 'XXXXX'; 
      
      let tipoDocStr = 'XXXXX';
      // this.tipoDocumentoNotificado ya estará en minúscula.
      if (this.tipoDocumentoNotificado === 'prueba') {
        tipoDocStr = 'resolución que recibe la causa a prueba';
      } else if (this.tipoDocumentoNotificado === 'sentencia') {
        tipoDocStr = 'sentencia definitiva';
      }

      const fechaDocNotificadoStr = this.fechaDocumentoNotificado 
        ? this.formatDateToLong(this.fechaDocumentoNotificado) 
        : 'XXX de XXX de XXX';
      const folioDocNotificadoStr = this.folioDocumentoNotificado || 'XXX';

      let resolution = `Resolviendo presentación de fecha ${fechaPrincipalStr} a folio ${folioPrincipalStr}:\n\n`;
      resolution += `Como se pide, téngase por expresamente notificada a la parte ${parteStr} de la ${tipoDocStr} de fecha ${fechaDocNotificadoStr} a folio ${folioDocNotificadoStr}, con la fecha de inclusión de la presente resolución en el estado diario.`;

      if (this.tipoDocumentoNotificado === 'sentencia') {
        resolution += `\n\nSe hace presente que la sentencia estará disponible para su visualización una vez notificadas a todas las partes.`;
      }
      
      if (!this.fechaResolucionPrincipal && !this.folioResolucionPrincipal && !this.parteNotificada && !this.tipoDocumentoNotificado && !this.fechaDocumentoNotificado && !this.folioDocumentoNotificado) {
          return " "; 
      }

      return resolution;
    },
  },
  methods: {
    // ... (métodos formatDateToDisplay, formatDateToLong, borrarCampos, copyToClipboard sin cambios) ...
    formatDateToDisplay(date) {
      if (!date) return null;
      const d = new Date(date);
      const offset = d.getTimezoneOffset();
      const localDate = new Date(d.getTime() - (offset*60*1000));
      return localDate.toISOString().split('T')[0];
    },
    formatDateToLong(date) {
      if (!date) return 'XXXX de XXXX de XXXX';
      const d = new Date(date);
      const offset = d.getTimezoneOffset();
      const localDate = new Date(d.getTime() - (offset*60*1000));
      return localDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    },
    borrarCampos() {
      this.fechaResolucionPrincipal = null;
      this.folioResolucionPrincipal = '';
      this.parteNotificada = null;
      this.tipoDocumentoNotificado = null;
      this.fechaDocumentoNotificado = null;
      this.folioDocumentoNotificado = '';
    },
    async copyToClipboard() {
      if (!this.$refs.resolucionText || !this.generatedResolution.trim()) return;
      try {
        const htmlContentWithBreaks = this.generatedResolution.replace(/\n/g, '<br>');
        const styledHtmlToCopy = `<div style="font-family: Batang, serif; font-size: 12px; text-align: justify;">${htmlContentWithBreaks}</div>`;
        const plainText = this.generatedResolution;

        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([styledHtmlToCopy], { type: 'text/html' }),
            'text/plain': new Blob([plainText], { type: 'text/plain' }),
          })
        ]);
        this.tooltipVisible = true;
        setTimeout(() => {
          this.tooltipVisible = false;
        }, 2000);
      } catch (err) {
        console.error('No se pudo copiar el texto: ', err);
      }
    },
  },
};
</script>

<style scoped>
/* Los estilos scoped permanecen igual que en la versión anterior */
.resolucion-texto {
  font-family: 'Batang', serif; 
  font-size: 12px;
  text-align: justify;
  line-height: 1.6;
  color: var(--custom-beige-text);
  white-space: pre-wrap; 
}

.text-h5 {
  color: #E0E0E0; 
}

.v-select,
.v-text-field { /* Esto se aplica a todos los v-select y v-text-field */
  /* margin-bottom: 8px !important; */ /* Comentado o ajustado porque los v-row ahora manejan el mb-3 */
}

/* Añadimos el !important aquí si el estilo global de .v-text-field y .v-select de app.vue está interfiriendo */
/* y si los mb-3 en los v-row no son suficientes. Generalmente no es necesario. */
/* Las v-row con class="mb-3" deberían manejar bien el espaciado entre grupos. */

.text-right {
  text-align: right;
}
</style>