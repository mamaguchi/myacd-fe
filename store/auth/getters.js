export default {

  signupStatus (state) {
    return state.signupStatus
  },

  auth (state) {
    return state.auth
  },

  userName (state) {
    return state.auth.name
  },

  userIdent (state) {
    return state.auth.ident
  },

  userRole (state) {
    return state.auth.role
  }

}
