const express = require('express')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const authorsRouter = require('./controllers/authors')
const readingListRouter = require('./controllers/readingLists')
const errorHandler = require('./middleware/error')

const app = express()

app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglist', readingListRouter)

//load error middleware last
app.use(errorHandler)

app.get('/health', (req, res) => {
  res.send('ok')
})

module.exports = app
