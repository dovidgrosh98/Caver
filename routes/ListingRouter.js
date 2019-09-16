const express = require('express')
const { User, Listing, UserBooking } = require('../database/models')
const ListingRouter = express.Router()


ListingRouter.get('/', async (req, res) => {
  try {
    const listings = await Listing.findAll({ include: [User] })
    res.send(listings)
  } catch (e) {
    res.status(500).json({ msg: e.message })
  }
})


ListingRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const listing = await Listing.findByPk(id, {
      include: [User]
    })
    if (!listing) throw Error
    res.send(listing)
  } catch (e) {
    res.status(404).json({ msg: e.message })
  }
})

ListingRouter.post('/create/user/:id', async (req, res) => {
  try {
    const id = req.params.id

    const listing = await Listing.create(req.body)
    const user = await User.findByPk(id)
    if (!user) throw Error
    listing.setUser(user)
    res.json(listing)
  } catch (e) {
    res.status(500).json({ msg: e.message })
  }
})

ListingRouter.get('/:id/book', async (req, res) => {
  try {
    const userId = req.params.id

    const bookings = await UserBooking.findAll({
      where: { userId }
    })
    res.json(bookings)
  }
  catch (e) {
    res.status(404).json({ msg: e.message })
  }
})

ListingRouter.post('/book/user/:user_id/:list_id', async (req, res) => {
  try {
    const userId = req.params.user_id
    // const user = await User.findByPk(userId)
    const listingId = req.params.list_id
    // const listing = await Listing.findByPk(listingId)
    const book = await UserBooking.create({
      userId,
      listingId,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    })
    res.send(book)
  }
  catch (error) {
    res.status(500).json({ msg: error })
  }
})

ListingRouter.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const listing = await Listing.findByPk(id)
    if (!listing) throw Error
    await listing.update(req.body)
    res.json(listing)
  } catch (e) {
    res.status(304).json({
      message: e.message
    })
  }
})

/********* DELETE *********/
ListingRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const listing = await Listing.findByPk(id)
    if (!listing) throw Error
    await listing.destroy()
    res.json({
      message: `Listing with id ${id} deleted`
    })
  } catch (e) {
    res.json({ msg: e.message })
  }
})

module.exports = ListingRouter
