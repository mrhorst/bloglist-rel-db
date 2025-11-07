const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addConstraint('reading_lists', {
      fields: ['blog_id', 'user_id'],
      type: 'unique',
      name: 'reading_lists_unique_blog_id',
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint(
      'reading_lists',
      'reading_lists_unique_blog_id'
    )
  },
}
