import axios from 'axios'

const service = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/', // url = base url + request url
  timeout: 5000 // request timeout
})

service.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

export default service