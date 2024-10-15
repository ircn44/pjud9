<template>
    <v-container>
      <v-row>
        <!-- Columna Izquierda -->
        <v-col sm="6" md="6" lg="6">
          <v-form>
            <!-- Campo para Nombre -->
            <v-text-field
              v-model="nombre"
              label="Nombre"
              outlined
              dense
            ></v-text-field>
  
            <!-- Campo para RUT -->
            <v-text-field
              v-model="rut"
              label="RUT"
              outlined
              dense
              @input="formatRUT"
              :rules="[validateRUT]"
              maxlength="12"
            ></v-text-field>
  
            <!-- Checkbox Group para las Instituciones -->
            <div class="checkbox-container">
              <v-checkbox v-model="instituciones" :value="'Registro Civil'" label="Registro Civil"></v-checkbox>
              <v-checkbox v-model="instituciones" :value="'SII'" label="SII"></v-checkbox>
              <v-checkbox v-model="instituciones" :value="'Tesorería'" label="Tesorería"></v-checkbox>
              <v-checkbox v-model="instituciones" :value="'Servel'" label="Servel"></v-checkbox>
              <v-checkbox v-model="instituciones" :value="'PDI'" label="PDI"></v-checkbox>
              <v-checkbox v-model="instituciones" :value="'Carabineros'" label="Carabineros"></v-checkbox>
              <v-checkbox v-model="instituciones" :value="'Otros'" label="Otros"></v-checkbox>
            </div>
          </v-form>
          <v-btn :to="'/'">Volver</v-btn>
        </v-col>
  
        <!-- Columna Derecha -->
        <v-col sm="6" md="6" lg="6">
          <h2>Oficio</h2>
          <div ref="oficioText">
            <!-- Texto adicional antes de los checkboxes -->
            <p class="intro-text"><strong>Resolviendo presentación de fecha 21 de septiembre de 2024, a folio 10:</strong></p>
            <div v-for="(institucion, index) in instituciones" :key="index">
              <p>{{ generarTexto(institucion, false) }}</p>
            </div>
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
        nombre: '',
        rut: '',
        instituciones: [],
        tooltipVisible: false, // Controla la visibilidad del tooltip
      };
    },
  
    methods: {
      formatRUT() {
        let rutValue = this.rut.replace(/[^\dkK]/g, ''); // Remover caracteres inválidos
  
        if (rutValue.length > 9) {
          rutValue = rutValue.slice(0, 9);
        }
  
        let part1 = '';
        let part2 = '';
        let part3 = '';
        let checkDigit = '';
  
        if (rutValue.length > 1) {
          checkDigit = rutValue.slice(-1); // Último dígito
          part3 = rutValue.slice(-4, -1); // Los 3 dígitos antes del dígito verificador
          part2 = rutValue.slice(-7, -4); // Los 3 dígitos anteriores
          part1 = rutValue.slice(0, -7); // Los 1 o 2 dígitos restantes
        } else {
          part1 = rutValue;
        }
  
        if (part1.length > 2) {
          part2 = part1.slice(-3) + part2;
          part1 = part1.slice(0, -3);
        }
  
        this.rut = `${part1}.${part2}.${part3}-${checkDigit}`.toUpperCase();
      },
  
      validateRUT(rut) {
        const rutRegex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/;
        return rutRegex.test(rut) || 'El RUT ingresado no es válido';
      },
  
      generarTexto(institucion, conFormato = false) {
        const nombre = conFormato ? `<strong>${this.nombre}</strong>` : this.nombre;
        const rut = conFormato
          ? `<strong>cédula de identidad número ${this.rut}</strong>`
          : `cédula de identidad número ${this.rut}`;
  
        if (institucion === 'Registro Civil') {
          return `Atendido el convenio vigente entre el Poder Judicial y el Servicio de Registro Civil e Identificación y, habiéndose consultado en línea el domicilio de la parte demandada, ${nombre}, ${rut}, se informa que éste corresponde a XXXXXXX.`;
        } else if (institucion === 'SII') {
          return `Atendido el convenio vigente entre el Poder Judicial y el Servicio de Impuestos Internos, aplíquese la nomenclatura [1390], a fin de generar informe de domicilio de ${nombre}, ${rut}.`;
        } else if (institucion === 'Tesorería') {
          return `En cuanto a Tesorería General de la República y atendido lo dispuesto expresamente por Circular N°5 DL N°3 de fecha 16 de Marzo de 2016 mediante la cual se permite al Poder Judicial ingresar a la base de datos de Tesorería General de la República para los efectos de realizar la consulta de domicilio de las personas que correspondan en determinado juicio, como se pide, y habiéndose consultado el domicilio de ${nombre}, ${rut}, este corresponde a XXXXXXXX.`;
        } else if (institucion === 'Servel') {
          return `En cuanto, al Servicio Electoral, como se pide, ofíciese a fin de informar el domicilio actual de ${nombre}, ${rut}. Póngase a disposición de la parte solicitante oficio material, a través de la Oficina Judicial Virtual, al tercer día hábil desde la notificación por el estado diario de la presente resolución.`;
        } else if (institucion === 'PDI') {
          return `Como se pide, ofíciese a Policía de Investigaciones de Chile, Departamento de Extranjería, a fin de que informe las entradas y salidas del país de la parte demandada ${nombre}, ${rut}, desde el año 2023 a la actualidad.`;
        } else if (institucion === 'Carabineros') {
          return `Respecto al oficio solicitado para la Dirección General de Carabineros y Comisaría Virtual, y perteneciendo éstas a Carabineros de Chile, y por usar la misma de base de datos que el Registro Civil, no ha lugar por innecesario.`;
        } else if (institucion === 'Otros') {
          return `Con respecto a los oficios solicitados a XXXXX, careciendo de interconexión, y no correspondiendo a una institución que entregue información sobre domicilios, no ha lugar.`;
        }
      },
  
      copyToClipboard() {
        const range = document.createRange();
        range.selectNode(this.$refs.oficioText);
        window.getSelection().removeAllRanges(); // Limpia selección previa
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
    },
  };
  </script>
  
  <style>
  .checkbox-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .checkbox-container>* {
    margin-right: 10px;
  }
  
  .button {
    margin-top: 3%;
  }
  
  .resolucion-texto {
    font-family: 'Batang', serif;
    font-size: 12px;
    text-align: justify;
  }
  
  /* Estilo para el texto adicional */
  .intro-text {
    font-family: 'Batang', serif;
    font-size: 12px;
    text-indent: 2em;
  }
  </style>
  