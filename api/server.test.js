const request = require('supertest')
const server = require('./server');
const db = require('../data/dbConfig');

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
      let res = await request(server).post("/api/auth/register").send(lyub);
      expect(res.body).toMatchObject({id:1, password: res.body.password, username: 'lyub121'})
    })
  })

  describe('[POST] /api/auth/login', () => {

    it('responses with success welcome', async () => {
      await request(server).post("/api/auth/register").send(lyub)
      let res = await request(server).post('/api/auth/login').send(lyub)
      expect(res.body.message).toMatch(/welcome, lyub121/i)

    })

  })

})
