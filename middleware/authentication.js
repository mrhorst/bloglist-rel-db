const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const Session = require('../models/session')
const { User } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      next(error)
    }
  } else {
    return res.status(401).send({ error: 'token missing' })
  }
  next()
}

const checkTokenValidity = async (req, res, next) => {
  const { id, token_id } = req.decodedToken

  const user = await User.findOne({ where: { id } })

  const session = await Session.findOne({
    where: {
      userId: id,
      tokenId: token_id,
      active: true,
    },
  })

  if (!user.active || !session) {
    return res
      .status(401)
      .send({ error: 'user or session is inactive. please log in again' })
  }

  next()
}
module.exports = { tokenExtractor, checkTokenValidity }
