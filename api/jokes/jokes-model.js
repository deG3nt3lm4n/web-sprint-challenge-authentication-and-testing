const db = require('../../data/dbConfig');


function findBy(filter){
  return db('users').select('*').where(filter).first()
}

async function add(user){
  const [id] =  await db('users').insert(user)
  return db('users').where({id}).first()
}


module.exports = {
  findBy,
  add
};