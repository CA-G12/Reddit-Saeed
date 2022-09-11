const supertest = require('supertest');
const dbBuild = require('../server/database/migration/createTables');
const router = require('../server/app');
const connection = require('../server/database/config/connection');
// const custumError = require('../server/custumError');
// const invalidError = () => {
//   throw custumError('Invalid Email or Password', 400);
// };

beforeAll(() => dbBuild());
afterAll(() => connection.end());
describe('routes Testing with database', () => {
  test('check router work or not !', (done) => {
    supertest(router)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          expect(res.body).toEqual({});
          return done();
        }
      });
  });
  test('Sign Up User validation Error ', (done) => {
    supertest(router)
      .post('/api/v1/users/signup')
      .send({
        password: 'sasa',
        confirmPassword: 'sasa',
        email: 'BAZzOoKA@gmail.com',
        username: 'BAZz@OoKA',
        avatar: 'https://picsum.photos/200',
      })
      .expect(422)
      .expect('Content-Type', /html/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.req.res['statusMessage']).toBe('Unprocessable Entity');
        return done();
      });
  });
  test('Sign Up User object have success=true', (done) => {
    supertest(router)
      .post('/api/v1/users/signup')
      .send({
        password: 'sasa123456',
        confirmPassword: 'sasa123456',
        email: 'BAZzOoKA@gmail.com',
        username: 'BAZzOoKA',
        avatar: 'https://picsum.photos/200',
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body).toEqual({
            sucess: true,
            username: 'BAZzOoKA',
            operation: 'create user',
          });

          expect(res.headers['set-cookie'][0]).toContain('token');
          let str = res.headers['set-cookie'][0];
          process.env.TOKEN = str.substring(
            str.indexOf('=') + 1,
            str.indexOf(';')
          );
          done();
        }
      });
  });
  test('Sign Up User duplicate email', (done) => {
    supertest(router)
      .post('/api/v1/users/signup')
      .send({
        password: 'sasa123456',
        confirmPassword: 'sasa123456',
        email: 'BAZzOoKA@gmail.com',
        username: 'BAZzOoKA',
        avatar: 'https://picsum.photos/200',
      })
      .expect(500)
      .expect('Content-Type', /html/)
      .end((err, res) => {
        if (err) done(err);
        else {
          done();
        }
      });
  });
  test('get user by id === 1', (done) => {
    supertest(router)
      .get('/api/v1/users/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          expect(res.body).toEqual({
            username: 'BAZzOoKA',
            avatar: 'https://picsum.photos/200',
            email: 'BAZzOoKA@gmail.com',
          });
          return done();
        }
      });
  });
  test('ssign in user operation success', (done) => {
    supertest(router)
      .post('/api/v1/users/signin')
      .send({
        password: 'sasa123456',
        email: 'BAZzOoKA@gmail.com',
      })
      .expect(302)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.body).toEqual({
            sucess: true,
            operation: 'login user',
            username: 'BAZzOoKA',
          });
          expect(res.headers['set-cookie'][0]).toContain('token');
          done();
        }
      });
  });
  test('Sign In Invalid Email or Password [password is wrong]', (done) => {
    supertest(router)
      .post('/api/v1/users/signin')
      .send({
        password: 'ssa123456',
        email: 'BAZzOoKA@gmail.com',
      })
      .expect(400)
      .expect('Content-Type', /html/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log(res.req.res['statusMessage']);
        expect(res.req.res['statusMessage']).toBe('Bad Request');
        return done();
      });
  });
  //
  test('add Post success', (done) => {
    supertest(router)
      .post('/api/v1/posts')
      .send({
        title: 'BAZzOoOKABLACK',
        content: 'BAZzOoKAgmailcom',
      })
      .set('cookie', `token=${process.env.TOKEN}`)
      .expect(201)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).toEqual({
          id: 1,
          title: 'BAZzOoOKABLACK',
          content: 'BAZzOoKAgmailcom',
          user_id: 1,
        });
        return done();
      });
  });
  test('add post validation Error Unprocessable Entity', (done) => {
    supertest(router)
      .post('/api/v1/posts')
      .send({
        title: 'BAZzOo@OKABLACK',
        content: 'BAZzOoKAgmailcom',
      })
      .set('cookie', `token=${process.env.TOKEN}`)
      .expect(422)
      .expect('Content-Type', /html/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log(process.env.TOKEN, 'token hhhhhhhh');
        expect(res.req.res['statusMessage']).toBe('Unprocessable Entity');
        return done();
      });
  });
  test('add Post failed Unauthorized', (done) => {
    supertest(router)
      .post('/api/v1/posts')
      .send({
        title: 'BAZzOoOKABLACK',
        content: 'BAZzOoKAgmailcom',
      })
      .expect(401)
      .expect('Content-Type', /html/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.req.res['statusMessage']).toBe('Unauthorized');
        return done();
      });
  });
});
