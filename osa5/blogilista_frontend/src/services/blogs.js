import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)

  // sort blog posts by likes
  return request.then(response => {
    const sorted = response.data.sort((a, b) => b.likes - a.likes)
    return sorted
  })
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, blogToBeUpdated) => {

  const response = await axios.put(`${baseUrl}/${id}`, blogToBeUpdated)
  console.log('UPDATING: ', response.data)
  return response.data
}

const remove = async (id) => {

  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, create, update, setToken, remove }