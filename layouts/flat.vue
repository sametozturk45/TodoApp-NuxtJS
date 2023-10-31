<template>
    <v-app class="background">
        <v-container class="pa-0 ma-0" fluid>
          <Snackbar />
          <main>
            <Nuxt />
          </main>
        </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'FlatLayout',
    components:{
      Snackbar: () => import('@/components/static/Snackbar')
    }
  }
  </script>
  
  <style>
  html {
    overflow-y: auto;
  }
  
  .theme--light .background {
    background: #fafafa !important;
  }
  </style>