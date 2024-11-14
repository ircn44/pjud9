<template>
  <v-main :style="{ minHeight: '100vh', backgroundImage: `url(/asdf.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }">
    <v-container fluid class="d-flex align-center justify-center fill-height">
      <v-row class="w-100 d-flex align-center justify-center">
        <v-col cols="12" class="d-flex justify-center my-4">
          <v-btn :to="'/oficios'">Oficios</v-btn>
        </v-col>
        <v-col cols="12" class="d-flex justify-center my-4">
          <v-btn :to="'/causaaprueba'">Recibir la causa a prueba</v-btn>
        </v-col>
        <v-col cols="12" class="d-flex justify-center my-4">
          <v-btn :to="'/demandanueva'">Demanda nueva</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
