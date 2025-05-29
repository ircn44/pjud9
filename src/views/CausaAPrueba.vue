<template>
  <v-container>
    <v-row>
      <v-col sm="6" md="6" lg="6">
        <v-card class="pa-4" elevation="2">
          <h1 class="mb-4 text-h5">Excepciones comunes</h1>

          <div class="checkbox-container mb-4">
            <v-checkbox v-model="excepciones" value="Falta de capacidad" label="Falta de capacidad" density="compact" hide-details></v-checkbox>
            <v-checkbox v-model="excepciones" value="Falsedad del título" label="Falsedad del título" density="compact" hide-details></v-checkbox>
            <v-checkbox v-model="excepciones" value="Falta de requisitos" label="Falta de requisitos" density="compact" hide-details></v-checkbox>
            <v-checkbox v-model="excepciones" value="Exceso de avalúo" label="Exceso de avalúo" density="compact" hide-details></v-checkbox>
            <v-checkbox v-model="excepciones" value="Pago de la deuda" label="Pago de la deuda" density="compact" hide-details></v-checkbox>
            <v-checkbox v-model="excepciones" value="Concesión de esperas" label="Concesión de esperas" density="compact" hide-details></v-checkbox>
            <v-checkbox v-model="excepciones" value="Nulidad de la obligación" label="Nulidad de la obligación" density="compact" hide-details></v-checkbox>
          </div>
          <v-divider class="mb-4"></v-divider>
          <div class="checkbox-container2">
            <v-checkbox v-model="excepciones" value="Incompetencia" label="Incompetencia" density="compact" hide-details></v-checkbox>
            <v-checkbox v-model="excepciones" value="Ineptitud del libelo" label="Ineptitud del libelo" density="compact" hide-details></v-checkbox>
            <v-checkbox v-model="excepciones" value="Prescripción" label="Prescripción" density="compact" hide-details></v-checkbox>
          </div>
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
          <div ref="ResolucionText" class="resolucion-texto mb-4" style="max-height: 400px; overflow-y: auto; border: 1px solid #444; padding: 10px; border-radius: 4px;">
            <p><strong>Resolviendo presentación de fecha 28 de agosto de 2024, de folio 14:</strong><br></p>
            <p>Téngase por evacuado el traslado conferido por resolución de folio 13. Estese a lo que se resolverá. <br></p>
            <p><strong>VISTOS:</strong><br></p>
            <p>Se declaran admisibles las excepciones deducidas, y se reciben a prueba por el término legal, fijándose como puntos sobre los cuales deberán recaer, los siguientes;<br></p>
            <ol v-if="excepcionesFiltradas.length > 0" class="pl-5">
              <li v-for="(excepcion, index) in excepcionesFiltradas" :key="index">
                {{ generarTexto(excepcion) }}
              </li>
            </ol>

            <div v-if="excepcionesNoNumeradas.length > 0">
              <p v-for="(excepcion, index) in excepcionesNoNumeradas" :key="index">
                {{ generarTexto(excepcion) }}
              </p>
            </div>

            <br><p>En caso que las partes ofrezcan prueba testimonial y/o confesional dentro del plazo legal, esta se rendirá en forma presencial en el tribunal los últimos tres días del probatorio a las 9:30 horas, principiando con el demandante.</p> <br>
            <p><strong>Notifíquese por cédula.</strong></p>
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
  name: 'CausaapruebaView', 

  data() {
    return {
      excepciones: [],
      tooltipVisible: false,
    };
  },
  computed: {
    excepcionesFiltradas() {
      const grupo1 = ['Falta de capacidad', 'Falsedad del título', 'Falta de requisitos', 'Exceso de avalúo', 'Pago de la deuda', 'Concesión de esperas', 'Nulidad de la obligación'];
      return this.excepciones.filter(ex => grupo1.includes(ex));
    },
    excepcionesNoNumeradas() {
      const grupo2 = ['Incompetencia', 'Ineptitud del libelo', 'Prescripción'];
      return this.excepciones.filter(ex => grupo2.includes(ex));
    }
  },
  methods: {
    // MÉTODO BORRAR CAMPOS AÑADIDO AQUÍ
    borrarCampos() {
      this.excepciones = [];
    },
    generarTexto(excepcion) {
      if (excepcion === 'Incompetencia') {
        return 'Respecto a la excepción de incompetencia, se omite su recepción a prueba por tratarse de un punto de derecho.';
      } else if (excepcion === 'Falta de capacidad') {
        return 'Efectividad de existir la falta de capacidad del demandante o de la personería o representación legal de la persona que comparece en su nombre para actuar en autos.';
      } else if (excepcion === 'Ineptitud del libelo') {
        return 'Respecto a la excepción de ineptitud del libelo, atendida su naturaleza, se omite su recepción a prueba.';
      } else if (excepcion === 'Falsedad del título') {
        return 'Efectividad que el título que se hace valer en juicio es falso.';
      } else if (excepcion === 'Falta de requisitos') {
        return 'Efectividad que el título que se hace valer en juicio carece de alguno de los requisitos o condiciones que establece la ley para que tenga mérito ejecutivo.';
      } else if (excepcion === 'Exceso de avalúo') {
        return 'Efectividad que en la obligación pretendida existiría un error de cálculo que constituiría un exceso de avalúo de la ejecución del presente juicio.';
      } else if (excepcion === 'Pago de la deuda') {
        return 'Efectividad que las demandadas pagaron total o parcialmente la obligación que se persigue; fechas y montos.';
      } else if (excepcion === 'Concesión de esperas') {
        return 'Efectividad de haber concedido la ejecutante esperas o prórrogas del plazo a la ejecutada.';
      } else if (excepcion === 'Novación') { 
        return 'Texto para Novación';
      } else if (excepcion === 'Nulidad de la obligación') {
        return 'Efectividad que la obligación que se persigue en estos autos es nula.';
      } else if (excepcion === 'Pérdida de la cosa') { 
        return 'Texto para Pérdida de la cosa';
      } else if (excepcion === 'Prescripción') {
        return 'Respecto a la excepción de prescripción, atendida su naturaleza, se omite su recepción a prueba.';
      }
      return '';
    },
    async copyToClipboard() { 
      if (!this.$refs.ResolucionText) return;
      try {
        const htmlToCopy = this.$refs.ResolucionText.innerHTML;
        const blobHtml = new Blob([htmlToCopy], { type: 'text/html' });
        const blobText = new Blob([this.$refs.ResolucionText.innerText], { type: 'text/plain' });
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': blobHtml,
            'text/plain': blobText
          })
        ]);
        this.tooltipVisible = true;
        setTimeout(() => {
          this.tooltipVisible = false;
        }, 2000);
      } catch (err) {
        console.error('Error al copiar al portapapeles: ', err);
      }
    }
  }
}
</script>

<style scoped>
.checkbox-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; 
}

.checkbox-container > .v-checkbox {
  flex-basis: calc(50% - 4px); 
}

.checkbox-container2 {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.checkbox-container2 > .v-checkbox {
  flex-basis: calc(50% - 4px);
}

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

.text-right {
  text-align: right;
}
</style>