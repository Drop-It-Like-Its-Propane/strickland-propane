const { models: {User }} = require('../db')

//middle wear for requests requiring login to view
const requireToken = async (req,res,next) =>{
  try {
    const user = await User.findByToken(req.headers.authorization)
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

//verify user access
const verifyUser = (req, res, next) => {
  if (parseInt(req.params.id) !== req.user.id) {
    return res.status(403).send('User does not have permission to view this page')
  } else {
    next()
  }
}

module.exports = {
  requireToken,
  isAdmin,
  verifyUser
}
