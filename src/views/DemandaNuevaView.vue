<template>
  <v-container>
    <v-row>
      <v-col sm="6" md="6" lg="6">
        <v-card class="pa-4" elevation="2">
          <h2 class="mb-4 text-h5">Ingresa los datos</h2>

          <v-checkbox
            v-model="cumpleFolio3"
            label="Cumple lo ordenado a folio 3?"
            density="compact"
            hide-details
            class="mb-3" 
          ></v-checkbox>

          <v-select
            v-model="selectedOptions['A lo principal']"
            :items="principalOptions"
            label="A lo principal"
            outlined
            dense
            class="mb-3"
            hide-details
          ></v-select>

          <v-row dense>
            <v-col cols="6" v-for="(label, index) in otrosiLabels" :key="index">
              <v-select
                v-model="selectedOptions[label]"
                :items="otrosiOptions"
                :label="label"
                outlined
                dense
                class="mb-3"
                hide-details
              ></v-select>
            </v-col>
          </v-row>
          <div class="mt-6 text-right">
            <v-btn 
              color="var(--custom-orange-accent)" 
              variant="text" 
              @click="borrarCampos" 
              class="mr-2"
            >
              Borrar
            </v-btn>
            <v-btn color="var(--custom-orange-accent)" variant="text" :to="'/'">Volver</v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col sm="6" md="6" lg="6">
        <v-card class="pa-4" elevation="2">
          <h2 class="mb-4 text-h5">Resolución</h2>
          <div
            ref="resolucionText"
            class="resolucion-texto mb-4"
            style="max-height: 400px; overflow-y: auto; border: 1px solid #444; padding: 10px; border-radius: 4px;"
          >
            <div v-if="cumpleFolio3">
              <p class="indent"><strong>Resolviendo presentación de folio 3:</strong></p>
              <p class="indent">Estese a lo que se resolverá.</p> 
            </div>
            
            <p class="indent"><strong>{{ titleText }}</strong></p>
            <div v-html="formattedText"></div>
          </div>
          <div class="text-right">
            <v-tooltip v-model="tooltipVisible" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  @click="copyToClipboard"
                  color="var(--custom-orange-accent)"
                  variant="flat"
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
export default {
  name: 'DemandanuevaView',

  data() {
    return {
      cumpleFolio3: false, // NUEVA PROPIEDAD PARA EL CHECKBOX
      principalOptions: [
        'Despáchese',
        'Notifíquese',
        'Notifíquese y requiérase personalmente al ejecutado',
      ],
      otrosiOptions: [
        'Señala bienes',
        'Acompaña documentos',
        'Exhórtese',
        'Estése 44',
        'Téngase presente',
        'Téngase por acompañado',
        'Téngase presente y por acompañado',
        'Como se pide'
      ],
      otrosiLabels: [
        'Al primer otrosí', 'Al segundo otrosí', 'Al tercer otrosí', 'Al cuarto otrosí', 'Al quinto otrosí',
        'Al sexto otrosí', 'Al séptimo otrosí', 'Al octavo otrosí', 'Al noveno otrosí', 'Al décimo otrosí',
      ],
      selectedOptions: {
        'A lo principal': null,
        'Al primer otrosí': null, 'Al segundo otrosí': null, 'Al tercer otrosí': null, 'Al cuarto otrosí': null, 'Al quinto otrosí': null,
        'Al sexto otrosí': null, 'Al séptimo otrosí': null, 'Al octavo otrosí': null, 'Al noveno otrosí': null, 'Al décimo otrosí': null,
      },
      tooltipVisible: false,
      titleText: 'Resolviendo presentación de fecha XXXX de XXXX de XXXX a folio 1:',
    };
  },

  computed: {
    formattedText() {
      // ... (la lógica de formattedText no necesita cambiar para esta funcionalidad específica)
      const texts = [];
      const otrosiLabels = this.otrosiLabels;
      const selectedOptions = this.selectedOptions;

      if (selectedOptions['A lo principal']) {
        const text = this.generarTexto('A lo principal', selectedOptions['A lo principal']);
        if (text) texts.push(text);
      }

      let currentOption = null;
      let currentLabels = [];

      for (let i = 0; i < otrosiLabels.length; i++) {
        const label = otrosiLabels[i];
        const option = selectedOptions[label];

        if (option) {
          if (currentOption === null) {
            currentOption = option;
            currentLabels = [label];
          } else if (option === currentOption) {
            currentLabels.push(label);
          } else {
            const combinedLabel = this.combineLabels(currentLabels);
            const text = this.generarTexto(combinedLabel, currentOption);
            if (text) texts.push(text);
            currentOption = option;
            currentLabels = [label];
          }
        } else {
          if (currentOption !== null) {
            const combinedLabel = this.combineLabels(currentLabels);
            const text = this.generarTexto(combinedLabel, currentOption);
            if (text) texts.push(text);
            currentOption = null;
            currentLabels = [];
          }
        }
      }

      if (currentOption !== null && currentLabels.length > 0) {
        const combinedLabel = this.combineLabels(currentLabels);
        const text = this.generarTexto(combinedLabel, currentOption);
        if (text) texts.push(text);
      }

      const concatenatedText = texts.join('; ');
      let finalHtml = `<p class="indent">${concatenatedText ? concatenatedText + '.' : ''}</p>`;
      finalHtml += `<p class="indent"><strong>CUANTÍA:</strong> </p>`;
      return finalHtml;
    },
  },

  methods: {
    borrarCampos() {
      this.selectedOptions = {
        'A lo principal': null,
        'Al primer otrosí': null, 'Al segundo otrosí': null, 'Al tercer otrosí': null, 'Al cuarto otrosí': null, 'Al quinto otrosí': null,
        'Al sexto otrosí': null, 'Al séptimo otrosí': null, 'Al octavo otrosí': null, 'Al noveno otrosí': null, 'Al décimo otrosí': null,
      };
      this.cumpleFolio3 = false; // RESETEAR EL CHECKBOX
    },
    combineLabels(labels) {
      // ... (sin cambios)
      const ordinals = labels.map(label => label.replace('Al ', '').replace(' otrosí', ''));
      if (ordinals.length === 0) return '';
      if (ordinals.length === 1) return `Al ${ordinals[0]} otrosí`;
      if (ordinals.length === 2) return `Al ${ordinals[0]} y ${ordinals[1]} otrosí`;
      return `Al ${ordinals.slice(0, -1).join(', ')} y ${ordinals[ordinals.length - 1]} otrosí`;
    },

    generarTexto(label, option) {
      // ... (sin cambios, aunque el texto de "Acompaña documentos" parece actualizado en tu código)
      const boldLabel = `<strong>${label}</strong>`;
      if (label === 'A lo principal') {
        if (option === 'Despáchese') return `${boldLabel}: despáchese`;
        if (option === 'Notifíquese') return `${boldLabel}: Notifíquese`;
        if (option === 'Notifíquese y requiérase personalmente al ejecutado') return `${boldLabel}: Notifíquese y requiérase personalmente al ejecutado`;
      } else {
        if (option === 'Señala bienes') return `${boldLabel}: téngase presente, y sólo sobre bienes suficientes de la parte ejecutada, la que queda como depositaria provisional`;
        if (option === 'Acompaña documentos') return `${boldLabel}: téngase por acompañado el pagaré y contrato bajo apercibimiento del artículo 346 N°3 del Código de Procedimiento Civil. Custódiese el pagaré bajo el número XXXX-2025. A los demás documentos, por acompañados, con citación`;
        if (option === 'Exhórtese') return `${boldLabel}: como se pide, exhórtese vía interconexión al Juzgado de Letras de turno en lo Civil de XXXX, a fin de practicarse la notificación de la demanda al ejecutado, requerirlo de pago y trabar el embargo sobre las especies de su propiedad, de ser necesario y facultándose, en caso de oposición, a conceder el auxilio de fuerza pública con facultades de allanamiento y descerrajamiento, además de todas aquellas diligencias y actuaciones necesarias y conducentes para obtener el cabal y pronto diligenciamiento del presente exhorto`;
        if (option === 'Estése 44') return `${boldLabel}: estese a lo dispuesto en el artículo 44 del Código de Procedimiento Civil`;
        if (option === 'Téngase presente') return `${boldLabel}: téngase presente`;
        if (option === 'Téngase por acompañado') return `${boldLabel}: téngase por acompañado, con citación`;
        if (option === 'Téngase presente y por acompañado') return `${boldLabel}: téngase presente y por acompañado, con citación`;
        if (option === 'Como se pide') return `${boldLabel}: como se pide`;
      }
      return '';
    },

    async copyToClipboard() { 
      // No se necesitan cambios aquí, ya que this.$refs.resolucionText.innerHTML
      // ahora incluirá dinámicamente el texto del "folio 3" si el checkbox está marcado.
      if (!this.$refs.resolucionText) return;
      try {
        const htmlContent = this.$refs.resolucionText.innerHTML;
        const styledHtmlToCopy = `<div style="font-family: Batang, serif; font-size: 12px; text-align: justify;">${htmlContent}</div>`;
        const plainText = this.$refs.resolucionText.innerText;

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
/* ... (tus estilos scoped sin cambios) ... */
.resolucion-texto {
  font-family: 'Batang', serif; 
  font-size: 12px;
  text-align: justify;
  line-height: 1.6;
  color: var(--custom-beige-text);
}

.text-h5 {
  color: #E0E0E0;
}

.indent {
  text-indent: 2em;
  margin-bottom: 1em; 
}

.v-select {
  margin-bottom: 8px; 
}
.text-right {
  text-align: right;
}
</style>