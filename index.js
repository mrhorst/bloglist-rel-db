require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')

const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
})

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
)

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.use(express.json())

app.post('/api/blogs', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.send(blog)
})

app.delete('/api/blogs/:id', async (req, res) => {
  const blogToDelete = await Blog.findByPk(req.params.id)
  await blogToDelete.destroy()
  res.sendStatus(204) //no content
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('Listening on port ', PORT)
})
