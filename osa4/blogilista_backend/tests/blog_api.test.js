const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Politiikan murhenäytelmät',
    author: 'Lennart Meri',    
    likes: 0,
  },
  {
    title: 'Koodauksen riemuvoitot',
    author: 'Jaakobin poikien isä',
    likes: 20,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body).toHaveLength(2)
})

afterAll(() => {
  mongoose.connection.close()
})