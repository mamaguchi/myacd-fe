export default {

  auth (state, authData) {
    state.auth = authData
  },

  prevRoute (state, prevRoute) {
    state.prevRoute = prevRoute
  },

  signupStatus (state, signupStatus) {
    state.signupStatus = signupStatus
  }

}
