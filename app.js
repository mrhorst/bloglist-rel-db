const express = require('express')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const authorsRouter = require('./controllers/authors')
const errorHandler = require('./middleware/error')

const app = express()

app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/authors', authorsRouter)

//load error middleware last
app.use(errorHandler)

app.get('/health', (req, res) => {
  res.send('ok')
})

module.exports = app
