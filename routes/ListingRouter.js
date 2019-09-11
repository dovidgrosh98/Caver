const express = require('express')
const { User, Listing } = require('../database/models')
const ListingRouter = express.Router()


ListingRouter.get('/', async (req, res) => {
  try {
    const listings = await Listing.findAll()
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
    if (!project) throw Error
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
