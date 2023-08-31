import axios from 'axios'

const getTransactionStatus = async orderId => {
  const options = {
    method: 'GET',
    url: `https://api.testwyre.com/v3/orders/${orderId}`,
    headers: { accept: 'application/json' }
  }

  return axios
    .request(options)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.error(error)
    })
}

export default getTransactionStatus
