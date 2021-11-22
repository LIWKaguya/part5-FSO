import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const upload = async object => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, object, config)
  return response.data
}

const object = {getAll, setToken, upload}
export default object 