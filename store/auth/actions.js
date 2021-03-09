// import qs from 'qs'

const cookies = process.client ? require('js-cookie') : undefined

export default {
  async login (context, formData) {
    try {
      let response
      if (process.env.NODE_ENV === 'production') {
        response = await this.$axios.post('https://myvaksin.com/signin', formData)
      } else {
        response = await this.$axios.post('http://localhost:8080/signin', formData)
      }
      cookies.set('auth', response.data)
      context.commit('auth', response.data)
      if (response.data.role === 'receiver') {
        this.$router.push('/people?ident=' + response.data.ident + '&isNewProfile=false')
      } else {
        this.$router.push('/home')
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data)
        // console.log(error.response.status)
        // console.log(error.response.headers)

        if (error.response.status === 401 || error.response.status === 400) {
          return 'Invalid login credentials'
        } else if (error.response.status === 500) {
          return 'Unable to sign in at the moment, please try again later'
        } else {
          return 'Unable to sign in at the moment, please try again later'
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request)

        return 'Unable to sign in at the moment, please try again later'
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message)

        return 'Unable to sign in at the moment, please try again later'
      }
    }
  },

  logout ({ commit }) {
    cookies.remove('auth')
    commit('auth', null)
  },

  async signup (context, formData) {
    try {
      let response
      if (process.env.NODE_ENV === 'production') {
        response = await this.$axios.post('https://myvaksin.com/signup', formData)
      } else {
        response = await this.$axios.post('http://localhost:8080/signup', formData)
      }
      if (response.data.signUpRespCode === '1') {
        context.commit('signupStatus', 'New User account created')
        return ''
      } else if (response.data.signUpRespCode === '0') {
        return 'User account with this ID already exists'
      }
    } catch (error) {
      alert(error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data)
        // console.log(error.response.status)
        // console.log(error.response.headers)

        return 'Unable to sign up at the moment, please try again later'
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request)

        return 'Unable to sign up at the moment, please try again later'
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message)

        return 'Unable to sign up at the moment, please try again later'
      }
    }
  }

}
