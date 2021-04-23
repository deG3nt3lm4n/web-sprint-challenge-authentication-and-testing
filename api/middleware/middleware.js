const Jokes = require('../jokes/jokes-model');

async function usernameCheck(req,res,next){

  const {username} = req.body

  try {

    const usernameB = Jokes.findByUsername({username: username})

    if(!usernameB){
      next({status: 401, message: 'username taken'})
    }else{
      next()
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