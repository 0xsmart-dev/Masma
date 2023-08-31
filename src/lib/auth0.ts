import axios from 'axios'

export const sendVerificationCode = async (userEmail: string) => {
  const options = {
    method: 'POST',
    url: `${process.env.AUTH0_DOMAIN}/passwordless/start`,
    headers: { 'content-type': 'application/json' },
    data: {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      connection: 'email',
      email: userEmail,
      send: 'code'
    }
  }

  return axios
    .request(options)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      throw new Error(error.message)
    })
}

export const verifyCode = async (email, code) => {
  const options = {
    method: 'POST',
    url: `${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    data: {
      grant_type: 'http://auth0.com/oauth/grant-type/passwordless/otp',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      username: email,
      otp: code,
      realm: 'email',
      scope: 'email'
    }
  }

  return axios
    .request(options)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.error(error)

      throw new Error(error.message || 'One-time code validation code failed')
    })
}
