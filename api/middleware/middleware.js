const Jokes = require('../jokes/jokes-model');

async function usernameCheck(req,res,next){

  const {username} = req.body

  try {

    const usernameB = await Jokes.findBy({username: username})
    console.log(usernameB)
    if(!usernameB){
      next({status: 401, message: 'username taken'})
    }else{
      req.user = usernameB
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