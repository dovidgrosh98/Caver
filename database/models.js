const { Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')

// connection to the database
const db = new Sequelize({
  database: 'caver_db',
  dialect: 'postgres'
})

// define models
const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  confirmPassword: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isRenter: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
})

const Listing = db.define('listing', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  costPerNight: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  user_id: Sequelize.INTEGER
})

User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(
    user.password,
    Number(process.env.SALT_ROUNDS)
  )
  user.password = hashedPassword
})
// define relationships

User.hasMany(Listing)

Listing.belongsTo(User)

module.exports = {
  db,
  User,
  Listing
}
