const route = require('express').Router()
const ReadingList = require('../models/readingList')
const tokenExtractor = require('../middleware/authentication')

route.post('/', tokenExtractor, async (req, res, next) => {
  if (req.decodedToken.id !== req.body.userId) {
    res.status(400).send({ error: 'you are not the owner' })
  }
  try {
    const readingList = await ReadingList.create({
      ...req.body,
    })
    res.send(readingList)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
})

route.put('/:id', tokenExtractor, async (req, res, next) => {
  const readingList = await ReadingList.findByPk(req.params.id)
  if (req.decodedToken.id !== readingList.userId) {
    res.status(400).send({ error: 'you are not the owner' })
  }
  const [_, result] = await ReadingList.update(
    { readingList, ...req.body },
    {
      where: { id: req.params.id },
      returning: true,
    }
  )
  res.send(result)
})

module.exports = route
