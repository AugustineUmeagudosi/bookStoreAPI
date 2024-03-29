/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1/books';

describe('Customer Routes', () => {
  it('Should fail to fetch books if an invalid authentication token was provided', (done) => {
    expect(process.env.AUTH_TOKEN).to.exist;

    chai
      .request(app)
      .get(`${baseUrl}`)
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}err`)
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal('Invalid or expired token');
        done();
      });
  });

  it('Should fail to fetch books if no authentication token was provided', (done) => {
    chai
      .request(app)
      .get(`${baseUrl}`)
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal('Kindly login to continue');
        done();
      });
  });

  it('Should successfuly fetch books without pagination', (done) => {
    expect(process.env.AUTH_TOKEN).to.exist;

    chai
      .request(app)
      .get(`${baseUrl}`)
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
      .end((err, res) => {
        const { message, status, data } = res.body;
        expect(status).to.equal('success');
        expect(message).to.equal('books fetched successfully!');
        expect(data).to.exist;
        done();
      });
  });

  it('Should successfuly fetch books with pagination', (done) => {
    expect(process.env.AUTH_TOKEN).to.exist;

    chai
      .request(app)
      .get(`${baseUrl}?page=1&limit=10`)
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
      .end((err, res) => {
        const { message, status, data } = res.body;
        expect(status).to.equal('success');
        expect(message).to.equal('books fetched successfully!');
        expect(data).to.exist;
        done();
      });
  });
});
