<template>
  <v-main :style="{ minHeight: '100vh' }">
    <v-container fluid class="d-flex align-center justify-center fill-height">
      <v-row class="w-100" align="center" justify="center">
        <v-col cols="12" md="4" class="d-flex justify-center my-auto">
          <v-btn :to="'/oficios'">Oficios</v-btn>
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-center my-auto">
          <v-btn :to="'/causaaprueba'">Recibir la causa a prueba</v-btn>
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-center my-auto">
          <v-btn :to="'/demandanueva'">Demanda nueva</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
});
</script>

<style scoped>
.fill-height {
  min-height: 100vh; /* Asegura que el contenedor ocupe toda la pantalla */
}

.my-auto {
  margin: 50%;
}
</style>
