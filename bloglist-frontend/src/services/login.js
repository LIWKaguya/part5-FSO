import axios from 'axios'
const baseUrl = '/api/login'

const login = async Object => {
    const response = await axios.post(baseUrl, Object)
    return response.data
}

const object = {login}

export default object