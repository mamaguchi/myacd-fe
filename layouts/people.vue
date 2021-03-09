<template>
  <v-app>
    <v-main class="grey lighten-4">
      <nuxt />
      <!-- <core-footer class="mb-n8" /> -->
      <core-app-bar />
    </v-main>
  </v-app>
</template>

<script>
// import Footer from '@/components/core/Footer'
import AppBar from '@/components/core/AppBar'

export default {
  components: {
    // CoreFooter: Footer
    CoreAppBar: AppBar
  }
}
</script>

<style>

body > div {
    display: none;
}

body > footer#dashboard-core-footer {
    display: none;
}

body > div#__nuxt {
    display: block;
}

</style>
