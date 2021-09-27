const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router
const {requireToken, isAdmin, verifyUser} = require('./gatekeeper')

// To see a list of all users, must be logged in and an admin
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// To see a single user, must be the user or an admin
router.get('/:username', verifyUser, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
