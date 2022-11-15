import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVotes = async (id) => {

  console.log('updateVotes id: ', id)
  const anecdoteToUpdateVotes = await axios.get(`${baseUrl}/${id}`)  
  const changedAnecdote = {
    ...anecdoteToUpdateVotes.data,
    votes: anecdoteToUpdateVotes.data.votes + 1,
  }  
  const responseForUpdate = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
  console.log('responseForUpdate: ', responseForUpdate)

  // reload list
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll, createNew, updateVotes }