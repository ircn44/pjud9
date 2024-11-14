<template>
  <v-container>
    <v-row>
      <!-- Columna Izquierda -->
      <v-col sm="6" md="6" lg="6">
        <v-form>
          <!-- Checkbox Cumple lo ordenado a folio 3 -->
          <v-checkbox
            v-model="folio3Selected"
            label="Cumple lo ordenado a folio 3?"
            dense
          ></v-checkbox>

          <!-- Campo "A lo principal" -->
          <v-select
            v-model="selectedOptions['A lo principal']"
            :items="principalOptions"
            label="A lo principal"
            outlined
            dense
            class="small-select"
          ></v-select>

          <!-- Campos "Al primer otrosí" hasta "Al décimo otrosí" -->
          <v-row>
            <v-col cols="6" v-for="(label, index) in otrosiLabels" :key="index">
              <v-select
                v-model="selectedOptions[label]"
                :items="otrosiOptions"
                :label="label"
                outlined
                dense
                class="small-select"
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
        <v-btn :to="'/'">Volver</v-btn> 
        <v-btn @click="clearFields">Borrar todo</v-btn>
      </v-col>

      <!-- Columna Derecha -->
      <v-col sm="6" md="6" lg="6">
        <h2>Resolución</h2>
        <div ref="resolucionText" class="resolucion-texto">
          <!-- Texto adicional si el checkbox está seleccionado -->
          <p v-if="folio3Selected" class="indent">
            <strong>Resolviendo presentación de folio 3:</strong>
            <br>
            <span class="indent">Estese a lo que se resolverá.</span>
          </p>
          <p class="indent"><strong>{{ titleText }}</strong></p>
          <div v-html="formattedText"></div>
        </div>
        <div class="button">
          <v-tooltip v-model="tooltipVisible" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                @click="copyToClipboard"
              >
                Copiar
              </v-btn>
            </template>
            <span>Texto copiado al portapapeles</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
name: 'NuevaResolucion',

data() {
  return {
    folio3Selected: false, // Estado del checkbox para folio 3
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
      'No ha lugar',
    ],
    otrosiLabels: [
      'Al primer otrosí',
      'Al segundo otrosí',
      'Al tercer otrosí',
      'Al cuarto otrosí',
      'Al quinto otrosí',
      'Al sexto otrosí',
      'Al séptimo otrosí',
      'Al octavo otrosí',
      'Al noveno otrosí',
      'Al décimo otrosí',
    ],
    selectedOptions: {
      'A lo principal': null,
      'Al primer otrosí': null,
      'Al segundo otrosí': null,
      'Al tercer otrosí': null,
      'Al cuarto otrosí': null,
      'Al quinto otrosí': null,
      'Al sexto otrosí': null,
      'Al séptimo otrosí': null,
      'Al octavo otrosí': null,
      'Al noveno otrosí': null,
      'Al décimo otrosí': null,
    },
    tooltipVisible: false,
    titleText: 'Resolviendo presentación de fecha XXXX de XXXX de XXXX a folio 1:',
  };
},

computed: {
  formattedText() {
    const texts = [];
    const otrosiLabels = this.otrosiLabels;
    const selectedOptions = this.selectedOptions;

    // Procesar 'A lo principal' primero
    if (selectedOptions['A lo principal']) {
      const text = this.generarTexto('A lo principal', selectedOptions['A lo principal']);
      if (text) {
        texts.push(text);
      }
    }

    // Agrupar otrosíes consecutivos con la misma opción
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
          if (text) {
            texts.push(text);
          }
          currentOption = option;
          currentLabels = [label];
        }
      } else {
        if (currentOption !== null) {
          const combinedLabel = this.combineLabels(currentLabels);
          const text = this.generarTexto(combinedLabel, currentOption);
          if (text) {
            texts.push(text);
          }
          currentOption = null;
          currentLabels = [];
        }
      }
    }

    if (currentOption !== null && currentLabels.length > 0) {
      const combinedLabel = this.combineLabels(currentLabels);
      const text = this.generarTexto(combinedLabel, currentOption);
      if (text) {
        texts.push(text);
      }
    }

    const concatenatedText = texts.join('; ');
    let finalHtml = '';
    finalHtml += `<p class="indent">${concatenatedText ? concatenatedText + '.' : ''}</p>`;
    finalHtml += `<p class="indent"><strong>CUANTÍA:</strong></p>`;

    return finalHtml;
  },
},

methods: {
  combineLabels(labels) {
    const ordinals = labels.map(label =>
      label.replace('Al ', '').replace(' otrosí', '')
    );

    let combinedOrdinals = '';
    if (ordinals.length === 1) {
      combinedOrdinals = ordinals[0];
    } else if (ordinals.length === 2) {
      combinedOrdinals = `${ordinals[0]} y ${ordinals[1]}`;
    } else {
      combinedOrdinals =
        ordinals.slice(0, -1).join(', ') + ' y ' + ordinals[ordinals.length - 1];
    }

    return `Al ${combinedOrdinals} otrosí`;
  },

  generarTexto(label, option) {
    const boldLabel = `<strong>${label}</strong>`;
    if (label === 'A lo principal') {
      if (option === 'Despáchese') {
        return `${boldLabel}: despáchese`;
      } else if (option === 'Notifíquese') {
        return `${boldLabel}: Notifíquese`;
      } else if (option === 'Notifíquese y requiérase personalmente al ejecutado') {
        return `${boldLabel}: Notifíquese y requiérase personalmente al ejecutado`;
      }
    } else {
      if (option === 'Señala bienes') {
        return `${boldLabel}: téngase presente, y sólo sobre bienes suficientes de la parte ejecutada, la que queda como depositaria provisional`;
      } else if (option === 'Acompaña documentos') {
        return `${boldLabel}: téngase por acompañado el pagaré y contrato bajo apercibimiento del artículo 346 N°3 del Código de Procedimiento Civil, en custodia bajo el número XXXX-2024. A los demás documentos, por acompañados, con citación`;
      } else if (option === 'Exhórtese') {
        return `${boldLabel}: como se pide, exhórtese vía interconexión al Juzgado de Letras de turno en lo Civil de XXXX, a fin de practicarse la notificación de la demanda al ejecutado, requerirlo de pago y trabar el embargo sobre las especies de su propiedad, de ser necesario y facultándose, en caso de oposición, a conceder el auxilio de fuerza pública con facultades de allanamiento y descerrajamiento, además de todas aquellas diligencias y actuaciones necesarias y conducentes para obtener el cabal y pronto diligenciamiento del presente exhorto`;
      } else if (option === 'Estése 44') {
        return `${boldLabel}: estese a lo dispuesto en el artículo 44 del Código de Procedimiento Civil`;
      } else if (option === 'Téngase presente') {
        return `${boldLabel}: téngase presente`;
      } else if (option === 'Téngase por acompañado') {
        return `${boldLabel}: téngase por acompañado, con citación`;
      } else if (option === 'Téngase presente y por acompañado') {
        return `${boldLabel}: téngase presente y por acompañado, con citación`;
      } else if (option === 'No ha lugar') {
        return `${boldLabel}: no ha lugar`;
      }
    }
    return '';
  },

  copyToClipboard() {
    const range = document.createRange();
    range.selectNode(this.$refs.resolucionText);
    window.getSelection().removeAllRanges(); // Limpiar la selección previa
    window.getSelection().addRange(range); // Selecciona el contenido

    try {
      document.execCommand('copy'); // Ejecuta la copia
      this.tooltipVisible = true;
      setTimeout(() => {
        this.tooltipVisible = false;
      }, 2000);
    } catch (err) {
      console.error('No se pudo copiar el texto', err);
    }

    window.getSelection().removeAllRanges(); // Limpia la selección
  },

  // Método para limpiar todos los campos
  clearFields() {
    Object.keys(this.selectedOptions).forEach(key => {
      this.selectedOptions[key] = null;
    });
    this.folio3Selected = false;
  },
},
};
</script>

<style>
.button {
margin-top: 3%;
}

.resolucion-texto {
font-family: 'Batang', serif;
font-size: 12px;
text-align: justify;
}

.v-select .v-input__control {
min-height: 40px;
}

/* Organizar los selects en dos columnas */
.v-form {
display: flex;
flex-direction: column;
}

.v-row {
flex-wrap: wrap;
}

.v-col {
padding: 0 5px;
}

/* Clase para la sangría */
.indent {
text-indent: 2em;
display: block;
margin-bottom: 1em;
}
</style>
