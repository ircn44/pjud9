<template>
  <v-container>
    <v-row>
      <v-col sm="12" md="6">
        <v-card class="pa-4" elevation="2">
          <h2 class="mb-4 text-h5">Ingresa los datos</h2>
          <v-text-field
            v-model="nombre"
            label="Nombre Completo"
            outlined
            dense
            class="mb-3"
            hide-details
          ></v-text-field>
          <v-text-field
            v-model="rut"
            label="RUT (ej: 12.345.678-K)"
            outlined
            dense
            @input="formatRUT"
            :rules="[validateRUTInput]"
            maxlength="12"
            class="mb-3"
            hide-details
          ></v-text-field>
          <h3 class="text-subtitle-1 mb-2 mt-4">Seleccionar Instituciones</h3>
          <div class="checkbox-container mb-4">
            <v-checkbox v-model="instituciones" value="Registro Civil" label="Registro Civil" density="compact" hide-details></v-checkbox>
            <v-checkbox v-model="instituciones" value="SII" label="SII" density="compact" hide-details></v-checkbox>
            <v-checkbox v-model="instituciones" value="Tesorería" label="Tesorería" density="compact" hide-details></v-checkbox>
            <v-checkbox v-model="instituciones" value="Servel" label="Servel" density="compact" hide-details></v-checkbox>
            <v-checkbox v-model="instituciones" value="PDI" label="PDI" density="compact" hide-details></v-checkbox>
            <v-checkbox v-model="instituciones" value="Carabineros" label="Carabineros" density="compact" hide-details></v-checkbox>
            <v-checkbox v-model="instituciones" value="Otros" label="Otros" density="compact" hide-details></v-checkbox>
          </div>
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

      <v-col sm="12" md="6">
        <v-card class="pa-4" elevation="2">
          <h2 class="mb-4 text-h5">Texto del oficio</h2>
          
          <div ref="oficioText" class="resolucion-texto-scrollable mb-4">
            <p class="resolucion-texto mb-3"><strong>Resolviendo presentación de fecha [FECHA] de [MES] de [AÑO] a folio [FOLIO]:</strong></p>
            
            <div v-if="instituciones.length === 0" class="text-center grey--text" style="color: #9E9E9E !important;">
              <p>Selecciona una institución.</p>
            </div>
            <div v-for="(institucion, index) in instituciones" :key="index" class="mb-3">
              <p v-html="generarTexto(institucion, true)"></p>
            </div>
          </div>

          <div class="text-right">
            <v-tooltip v-model="tooltipVisible" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  @click="copyToClipboard"
                  color="var(--custom-orange-accent)"
                  variant="flat"
                  :disabled="instituciones.length === 0"
                  style="color: white;" 
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
  name: 'OficiosView',
  data() {
    return {
      nombre: '',
      rut: '',
      instituciones: [],
      tooltipVisible: false,
    };
  },
  methods: {
    borrarCampos() {
      this.nombre = '';
      this.rut = '';
      this.instituciones = [];
    },
    formatRUT() {
      // ... (sin cambios)
      let rutValue = this.rut.replace(/[^\dkK.-]/g, ''); 
      rutValue = rutValue.replace(/[.-]/g, ''); 

      if (rutValue.length === 0) {
        this.rut = '';
        return;
      }

      let cuerpo = rutValue.slice(0, -1);
      let dv = rutValue.slice(-1).toUpperCase();
      
      cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      if (cuerpo && dv) {
        this.rut = `${cuerpo}-${dv}`;
      } else if (cuerpo) {
          this.rut = cuerpo; 
      } else {
          this.rut = dv; 
      }
    },
    validateRUTInput(value) {
      // ... (sin cambios)
      if (!value) return true; 
      const rutRegex = /^[0-9]{1,2}(\.?[0-9]{3})*-[0-9kK]{1}$/;
      if (value === '' || rutRegex.test(value)) {
        return true;
      }
      return 'Formato de RUT inválido';
    },
    generarTexto(institucion, conFormato = true) { 
      // ... (sin cambios)
      const nombreSanitizado = (this.nombre || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const rutSanitizado = (this.rut || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      const nombreMostrado = conFormato ? `<strong>${nombreSanitizado}</strong>` : nombreSanitizado;
      const rutMostrado = conFormato
        ? `<strong>cédula de identidad número ${rutSanitizado}</strong>`
        : `cédula de identidad número ${rutSanitizado}`;
      
      let texto = '';
      if (institucion === 'Registro Civil') {
        texto = `Atendido el convenio vigente entre el Poder Judicial y el Servicio de Registro Civil e Identificación y, habiéndose consultado en línea el domicilio de la parte demandada, ${nombreMostrado}, ${rutMostrado}, se informa que éste corresponde a XXXXXXX.`;
      } else if (institucion === 'SII') {
        texto = `Atendido el convenio vigente entre el Poder Judicial y el Servicio de Impuestos Internos, aplíquese la nomenclatura [1390], a fin de generar informe de domicilio de ${nombreMostrado}, ${rutMostrado}.`;
      } else if (institucion === 'Tesorería') {
        texto = `En cuanto a Tesorería General de la República y atendido lo dispuesto expresamente por Circular N°5 DL N°3 de fecha 16 de Marzo de 2016 mediante la cual se permite al Poder Judicial ingresar a la base de datos de Tesorería General de la República para los efectos de realizar la consulta de domicilio de las personas que correspondan en determinado juicio, como se pide, y habiéndose consultado el domicilio de ${nombreMostrado}, ${rutMostrado}, este corresponde a XXXXXXXX.`;
      } else if (institucion === 'Servel') {
        texto = `En cuanto, al Servicio Electoral, como se pide, ofíciese a fin de informar el domicilio actual de ${nombreMostrado}, ${rutMostrado}. Póngase a disposición de la parte solicitante oficio material, través de la Oficina Judicial Virtual, al tercer día hábil desde la notificación por el estado diario de la presente resolución.`;
      } else if (institucion === 'PDI') {
        texto = `Como se pide, ofíciese a Policía de Investigaciones de Chile, Departamento de Extranjería, a fin de que informe las entradas y salidas del país de la parte demandada ${nombreMostrado}, ${rutMostrado}, desde el año 2023 a la actualidad.`;
      } else if (institucion === 'Carabineros') {
        texto = `Respecto al oficio solicitado para la Dirección General de Carabineros y Comisaría Virtual, y perteneciendo éstas a Carabineros de Chile, y por usar la misma de base de datos que el Registro Civil, no ha lugar por innecesario.`;
      } else if (institucion === 'Otros') {
        texto = `Con respecto a los oficios solicitados a XXXXX, careciendo de interconexión, y no correspondiendo a una institución que entregue información sobre domicilios, no ha lugar.`;
      }
      return texto;
    },
    async copyToClipboard() { 
      // No se puede copiar si no hay instituciones (el botón está deshabilitado)
      // o si la referencia al div no existe.
      if (!this.$refs.oficioText || this.instituciones.length === 0) return; 
      
      try {
        // AHORA this.$refs.oficioText.innerHTML y .innerText YA INCLUYEN EL TÍTULO
        const htmlContent = this.$refs.oficioText.innerHTML;
        const plainTextContent = this.$refs.oficioText.innerText;
        
        const fullHtmlToCopy = `<div style="font-family: 'Batang', serif; font-size: 12px; text-align: justify;">${htmlContent}</div>`;
        
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([fullHtmlToCopy], { type: 'text/html' }),
            'text/plain': new Blob([plainTextContent.trim()], {type: 'text/plain'})
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

.resolucion-texto { 
  font-family: 'Batang', serif; 
  font-size: 12px;
  text-align: justify;
  line-height: 1.6;
  color: var(--custom-beige-text); 
}

.resolucion-texto-scrollable { 
  font-family: 'Batang', serif;
  font-size: 12px;
  text-align: justify;
  line-height: 1.6;
  max-height: 350px; 
  overflow-y: auto;
  border: 1px solid #555; 
  padding: 10px;
  border-radius: 4px;
  background-color: rgba(0,0,0,0.1); 
  color: var(--custom-beige-text);
}
.resolucion-texto-scrollable p:last-child {
  margin-bottom: 0;
}

.text-right {
  text-align: right;
}
.mb-3 {
  margin-bottom: 16px !important;
}
</style>