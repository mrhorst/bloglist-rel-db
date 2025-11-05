const app = require('../app')

const errorHandler = async (error, req, res, next) => {
  if (error.cause === 'Invalid blog id') {
    res.status(400).send({
      error: error.message,
    })
  }
  next(error)
}

module.exports = errorHandler
