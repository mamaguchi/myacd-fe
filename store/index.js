const cookie = process.server ? require('cookie') : undefined

// export const strict = false

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    // eslint-disable-next-line
    if (req.headers.cookie && req.headers.cookie.indexOf('auth') > -1) {
      // eslint-disable-next-line
      let auth = cookie.parse(req.headers.cookie)['auth']
      commit('auth/auth', JSON.parse(auth))
    }
  }
}
