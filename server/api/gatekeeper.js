const {models: {User}} = require('../db')

//middle wear for requests requiring login to view
const requireToken = async (req,res,next) =>{
  try {
    const token = req.headers.authorization
    const user = await User.findByToken(token)
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

//checks if user is Admin
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send('User does not have proper permissions')
  } else {
    next ()
  }
}


module.exports = {
  requireToken,
  isAdmin
}
