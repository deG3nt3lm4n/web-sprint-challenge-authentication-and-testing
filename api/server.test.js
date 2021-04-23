const request = require('supertest')
const server = require('./server');
const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs')

const lyub = {username: 'lyub121', password:'abc123'}

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})


afterAll(async (done) => {
  await db.destroy()
  done()
})

test('sanity', () => {
  expect(true).toBe(true)
})

describe('server', () => {

  describe('[GET] /api/jokes', () => {

    it("without access token", async () => {
      const res = await request(server).get("/api/jokes")
      expect(res.status).toEqual(401)
    })

    // it('with access token', async () => {

    //   let id = await db('users').insert(lyub)
    //   let user = await db('users').where({id}).first()



    // })

  })

  describe('[POST] /api/auth/register', () => {

    it("responds with user", async () => {
      await request(server).post("/api/auth/register").send(lyub);
      const user = await db('users').where('username', 'lyub121').first()
      expect(user).toMatchObject({username: 'lyub121'})
    })

    it("responsed with password encrypted", async () => {
      await request(server).post('/api/auth/register').send(lyub)
      const user = await db('users').where('username', 'lyub121').first()
      expect(bcrypt.compareSync('abc123', user.password)).toBeTruthy()
    })

  })

  describe('[POST] /api/auth/login', () => {

    it('responses with success welcome', async () => {
      await request(server).post("/api/auth/register").send(lyub)
      let res = await request(server).post('/api/auth/login').send(lyub)
      expect(res.body.message).toMatch(/welcome, lyub121/i)

    })

    it('responses with a fail', async () =>{
      let res = await request(server).post('/api/auth/login').send({username: 'lyub1212', password:'abc123'})
      expect(res.body.message).toMatch(/invalid credentials/i)
      expect(res.status).toBe(401)
    })

  })

})
