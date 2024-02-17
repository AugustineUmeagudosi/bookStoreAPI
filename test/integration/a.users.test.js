/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1/users';

describe('Customer Routes', () => {
  it('Should successfully register a user', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/signup`)
      .send({
        email: 'test@example.com',
        name: 'lorem ipsum',
        password: 'password',
      })
      .end((err, res) => {
        const { message, status, data } = res.body;
        expect(status).to.equal('success');
        expect(message).to.equal('Sign up successful!');
        expect(data).to.exist;
        done();
      });
  });

  it('Should fail to register a user email if account exists', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/signup`)
      .send({
        email: 'test@example.com',
        name: 'lorem ipsum',
        password: 'password',
      })
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal('Account already exists. Kindly proceed to the login screen');
        done();
      });
  });

  it('Should fail to register a user if email was not provided', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/signup`)
      .send({
        name: 'lorem ipsum',
        password: 'password',
      })
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal('Email is a required field');
        done();
      });
  });

  it('Should fail to register a user if password was not provided', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/signup`)
      .send({
        email: 'test02@example.com',
        name: 'lorem ipsum'
      })
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal('Password field is required');
        done();
      });
  });

  it('Should fail to register a user if name was not provided', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/signup`)
      .send({
        email: 'test02@example.com',
        password: 'password'
      })
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal('name is a required field');
        done();
      });
  });

  it('Should fail to register a user if password is not up to 7 characters', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/signup`)
      .send({
        email: 'test02@example.com',
        name: 'lorem Balablu',
        password: 'passwo',
      })
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal('Password can not be lesser than 7 characters');
        done();
      });
  });

  it('Should successfully login a user', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/login`)
      .send({ email: 'test@example.com', password: 'password' })
      .end((err, res) => {
        const { message, status, data: { auth_token } } = res.body;
        expect(status).to.equal('success');
        expect(message).to.equal('Login successful!');
        expect(auth_token).to.exist;
        process.env.AUTH_TOKEN = auth_token;
        done();
      });
  });

  it('Should fail to login a user with email if account does not exist', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/login`)
      .send({ email: 'test02@example.com', password: 'password' })
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal('Invalid email or password');
        done();
      });
  });

  it('Should fail to login a user with email if password is wrong', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}/login`)
      .send({ email: 'test@example.com', password: 'wrongPassword' })
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal('Invalid email or password');
        done();
      });
  });
});
