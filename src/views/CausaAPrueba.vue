<template>
    <v-container>
      <v-row>
        <!-- Columna Izquierda -->
        <v-col sm="6" md="6" lg="6">
          <v-form>
            <h1>Excepciones típicas</h1>
  
            <!-- Checkbox Group para las Excepciones -->
            <div class="checkbox-container">
              <v-checkbox v-model="excepciones" :value="'Falta de capacidad'" label="Falta de capacidad"></v-checkbox>
              <v-checkbox v-model="excepciones" :value="'Falsedad del título'" label="Falsedad del título"></v-checkbox>
              <v-checkbox v-model="excepciones" :value="'Falta de requisitos'" label="Falta de requisitos"></v-checkbox>
              <v-checkbox v-model="excepciones" :value="'Exceso de avalúo'" label="Exceso de avalúo"></v-checkbox>
              <v-checkbox v-model="excepciones" :value="'Pago de la deuda'" label="Pago de la deuda"></v-checkbox>
              <v-checkbox v-model="excepciones" :value="'Concesión de esperas'" label="Concesión de esperas"></v-checkbox>
              <v-checkbox v-model="excepciones" :value="'Nulidad de la obligación'" label="Nulidad de la obligación"></v-checkbox>
            </div>
            <v-divider></v-divider>
            <div class="checkbox-container2">
              <v-checkbox v-model="excepciones" :value="'Incompetencia'" label="Incompetencia"></v-checkbox>
              <v-checkbox v-model="excepciones" :value="'Ineptitud del libelo'" label="Ineptitud del libelo"></v-checkbox>
              <v-checkbox v-model="excepciones" :value="'Prescripción'" label="Prescripción"></v-checkbox>
            </div>
          </v-form>
          <v-btn :to="'/'">Volver</v-btn>
        </v-col>
  
        <!-- Columna Derecha -->
        <v-col sm="6" md="6" lg="6">
          <h2>Resolución</h2>
          <div ref="ResolucionText" class="resolucion-texto">
            <p><strong>Resolviendo presentación de fecha 28 de agosto de 2024, de folio 14:</strong><br></p>
            <p>Téngase por evacuado el traslado conferido por resolución de folio 13. Estese a lo que se resolverá. <br></p>
            <p><strong>VISTOS:</strong><br></p>
            <p>Se declaran admisibles las excepciones deducidas, y se reciben a prueba por el término legal, fijándose como puntos sobre los cuales deberán recaer, los siguientes;<br></p>
            <!-- Lista numerada para excepciones del primer grupo -->
            <ol v-if="excepcionesFiltradas.length > 0">
              <li v-for="(excepcion, index) in excepcionesFiltradas" :key="index">
                {{ generarTexto(excepcion) }}
              </li>
            </ol>
  
            <!-- Párrafos para excepciones del segundo grupo -->
            <div v-if="excepcionesNoNumeradas.length > 0">
              <p v-for="(excepcion, index) in excepcionesNoNumeradas" :key="index">
                {{ generarTexto(excepcion) }}
              </p>
            </div>
  
            <br><p>En caso que las partes ofrezcan prueba testimonial y/o confesional dentro del plazo legal, esta se rendirá en forma presencial en el tribunal los últimos tres días del probatorio a las 9:30 horas, principiando con el demandante.</p> <br>
            <p><strong>Notifíquese por cédula.</strong></p>
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
    name: 'HelloWorld',
  
    data() {
      return {
        traslado: '',
        excepciones: [], // Lista de excepciones seleccionadas
        tooltipVisible: false, // Controla la visibilidad del tooltip
      };
    },
    computed: {
      excepcionesFiltradas() {
        // Filtra las excepciones que están en el grupo "checkbox-container"
        const grupo1 = ['Falta de capacidad', 'Falsedad del título', 'Falta de requisitos', 'Exceso de avalúo', 'Pago de la deuda', 'Concesión de esperas', 'Nulidad de la obligación'];
        return this.excepciones.filter(ex => grupo1.includes(ex));
      },
      excepcionesNoNumeradas() {
        // Filtra las excepciones que están en el grupo "checkbox-container2"
        const grupo2 = ['Incompetencia', 'Ineptitud del libelo', 'Prescripción'];
        return this.excepciones.filter(ex => grupo2.includes(ex));
      }
    },
    methods: {
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
      copyToClipboard() {
        const range = document.createRange();
        range.selectNode(this.$refs.ResolucionText);
        window.getSelection().removeAllRanges(); // Limpia la selección previa
        window.getSelection().addRange(range); // Selecciona el contenido
        try {
          document.execCommand('copy'); // Copia el contenido seleccionado
          this.tooltipVisible = true;
          setTimeout(() => {
            this.tooltipVisible = false;
          }, 2000);
        } catch (err) {
          console.error('No se pudo copiar el texto', err);
        }
        window.getSelection().removeAllRanges(); // Limpia la selección
      }
    }
  }
  </script>
  
  <style>
  .checkbox-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .checkbox-container > * {
    margin-right: 10px;
  }
  
  .checkbox-container2 {
    display: flex;
    flex-wrap: wrap;
  }
  
  .button {
    margin-top: 3%;
  }
  
  .resolucion-texto {
    font-family: 'Batang', serif;
    font-size: 12px;
    text-align: justify;
  }
  </style>
  