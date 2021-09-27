const router = require('express').Router()
const { models: {User }} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)}); 
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, email, firstName, lastName} = req.body;
    const user = await User.create({username, password, email, firstName, lastName})
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    let login = await User.findByToken(req.headers.authorization)
    const { id, username, email, firstName, lastName, isAdmin, imageUrl} = login.dataValues
    console.log(id, username, email)
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})

// {attributes: ['firstName', 'lastName', 'username', 'isAdmin']}