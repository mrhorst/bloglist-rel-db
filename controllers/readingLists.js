const route = require('express').Router()
const ReadingList = require('../models/readingList')

route.post('/', async (req, res, next) => {
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

module.exports = route
