<template>
  <v-app-bar
    id="app-bar"
    app
    hide-on-scroll
    color="white"
    height="52"
    class="elevation-1"
  >
    <!-- <v-btn
      class="mr-3"
      text
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon
        v-else
        color="white"
      >
        mdi-menu
      </v-icon>
    </v-btn> -->

    <v-toolbar-title
      v-if="$route.name !== 'home'"
      class="hidden-sm-and-down"
    >
      <div
        style="cursor: pointer"
        class="onhover_highlight font-weight-regular"
        @click="goToHome"
      >
        <v-icon
          v-show="!isUserReceiver"
          left
        >
          mdi-chevron-left
        </v-icon>
        myVaksin
      </div>
    </v-toolbar-title>

    <v-spacer />

    <div
      v-if="isAuthenticated"
      style="cursor:pointer"
      class="ml-2 onhover_highlight font-weight-light text-subtitle-2"
      @click="signOut"
    >
      Sign Out
      <v-icon
        class="ml-1 mt-n1"
      >
        mdi-logout-variant
      </v-icon>
    </div>

    <v-btn
      v-else
      class="ml-2"
      min-width="0"
      text
      to="/login"
    >
      <span class="grey--text onhover_highlight">Sign In</span>
      <v-icon
        color="white"
        class="ml-1"
      >
        mdi-login-variant
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  name: 'AppBar',

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      //
    }
  },

  computed: {
    isAuthenticated () {
      if (this.$store.state.auth.auth === null || !this.$store.state.auth.auth.token) {
        return false
      } else {
        return true
      }
    },

    isUserReceiver () {
      return this.$store.getters['auth/userRole'] === 'receiver'
    }

  },

  methods: {
    ...mapActions('auth', {
      logout: 'logout'
    }),

    signOut () {
      try {
        this.logout()
        this.$router.push('/login')
      } catch (error) {
        // this.$router.push('/login')
        // Stay on same page so that user can retry logout again?
      }
    },

    goToHome () {
      if (this.isUserReceiver) {
        this.$router.push('/people')
        return
      }
      this.$router.push('/home')
    }

  }
}
</script>

<style scoped>

a.mynuxtlink {
    text-decoration: none;
}

.onhover_highlight:hover {
  color: #29B6F6;
}

.onhover_highlight {
  color: #55555c;
}

a.onhover_highlight:hover {
  color: #29B6F6;
}

</style>
