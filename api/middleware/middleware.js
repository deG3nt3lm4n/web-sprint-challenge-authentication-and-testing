const Jokes = require('../jokes/jokes-model');

async function usernameCheck(req,res,next){
  const {username} = req.body
  try {
    const usernameB = await Jokes.findBy({username: username})
    if(!usernameB){
      next()
    }else{
      next({status: 401, message: 'username taken'})
    }
  } catch (err) {
    next(err)
  }

}

function fieldCheck(req,res,next){
  const {username, password} = req.body

  if(!username || !password){
    next({status: 401, message:'username and password required'})
  }else{
    next()
  }

}


module.exports = {
  usernameCheck,
  fieldCheck
}