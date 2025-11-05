const { DATABASE_URL } = require('../util/config')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
  } catch (error) {
    console.log('failed to connect to the database: ', error)
    return process.exit(1)
  }
  return null
}

module.exports = { connectToDatabase, sequelize }
