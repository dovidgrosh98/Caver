const { Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')

// connection to the database
const db = new Sequelize(
  // comment "process.env.DATABASE_URL," for local server use:
  process.env.DATABASE_URL, 
  {
  // uncomment for local use:
  // database: 'caver_db',
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
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  costPerNight: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  beds: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  adults: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  freeWifi: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

const UserBooking = db.define('user_booking', {
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  userId: Sequelize.INTEGER,
  listingId: Sequelize.INTEGER
});

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

// User.belongsToMany(Listing, { through: UserBooking })
// Listing.belongsToMany(User, { through: UserBooking })

module.exports = {
  db,
  User,
  Listing,
  UserBooking
}
