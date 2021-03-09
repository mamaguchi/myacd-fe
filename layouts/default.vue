<template>
  <v-app>
    <!-- <core-drawer /> -->
    <!-- <core-settings /> -->
    <!-- <core-app-bar /> -->
    <core-view />
  </v-app>
</template>

<script>
// import Drawer from '@/components/core/Drawer'
// import Settings from '@/components/core/Settings'
// import AppBar from '@/components/core/AppBar'
import View from '@/components/core/View'

export default {
  components: {
    // CoreDrawer: Drawer,
    // CoreSettings: Settings
    // CoreAppBar: AppBar,
    CoreView: View
  },

  data: () => ({
    // drawer: null,
    expandOnHover: false
  })
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
