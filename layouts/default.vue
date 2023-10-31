<template>
  <v-app class="background">
      <Appbar />
      <v-container>
        <Snackbar />
        <main>
          <Nuxt />
        </main>
      </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  components:{
    Appbar:()=>import('@/components/static/Appbar'),
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