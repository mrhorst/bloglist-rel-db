const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')

app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.get('/health', (req, res) => {
  res.send('ok')
})

module.exports = app
