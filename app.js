const express = require('express')
const blogsRouter = require('./controllers/blogs')
const errorHandler = require('./middleware/error')

const app = express()

app.use(express.json())
app.use('/api/blogs', blogsRouter)

//load error middleware last
app.use(errorHandler)

app.get('/health', (req, res) => {
  res.send('ok')
})

module.exports = app
