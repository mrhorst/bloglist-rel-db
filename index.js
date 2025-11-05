const { PORT } = require('./util/config')
const app = require('./app')
const { connectToDatabase } = require('./util/db')

const start = async () => {
  try {
    await connectToDatabase()
    app.listen(PORT, () => {
      console.log('Listening on port ', PORT)
    })
  } catch (error) {
    console.log('Error: ', error)
    process.exit(1)
  }
}

start()
