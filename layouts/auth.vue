<template>
  <v-app>
    <core-view />
  </v-app>
</template>

<script>
import View from '@/components/core/View'

export default {
  components: {
    CoreView: View
  },

  data: () => ({
    expandOnHover: false
  })
}
</script>
