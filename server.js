const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const passport = require('passport')
const appRouter = require('./routes/AppRouter')
const AuthRouter = require('./routes/AuthRouter')
const path = require('path');

require('dotenv').config()


// Routing middleware
const ListingRouter = require('./routes/ListingRouter')
const UserRouter = require('./routes/UserRouter')

const PORT = process.env.PORT || 3001

// Use Body Parser when tied to databses!!!!!
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './client/build')));

app.use(logger('dev'))
app.use(cors())
app.use('/auth', AuthRouter)


app.get('/', async (req, res) => {
	res.send('connected')
})

app.use('/list', ListingRouter)


app.use('/users', UserRouter)
app.use('/app', appRouter)


app.use(passport.initialize())
if (process.env.NODE_ENV == "production") {
  app.use('*', (req, res) => res.sendFile(path.join(__dirname, './client/build', "index.html")));
}
app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`))
