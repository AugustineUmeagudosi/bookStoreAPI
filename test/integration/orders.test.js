/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1/orders';

describe('Customer Routes', () => {
  it('Should fail to create an order if an invalid authentication token was provided', (done) => {
    expect(process.env.AUTH_TOKEN).to.exist;

    chai
      .request(app)
      .post(`${baseUrl}`)
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}err`)
      .send({
        books: {
          '7TtlpKGz22': 1,
          '2gIsC7wawX': 2
        }
      })
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal('Invalid or expired token');
        done();
      });
  });

  it('Should fail to create order if no authentication token was provided', (done) => {
    chai
      .request(app)
      .post(`${baseUrl}`)
      .send({
        books: {
          '7TtlpKGz22': 1,
          '2gIsC7wawX': 2
        }
      })
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal('Kindly login to continue');
        done();
      });
  });

  it('Should successfuly create an order', (done) => {
    expect(process.env.AUTH_TOKEN).to.exist;

    chai
      .request(app)
      .post(`${baseUrl}`)
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
      .send({
        books: {
          '7TtlpKGz22': 1,
          '2gIsC7wawX': 2
        }
      })
      .end((err, res) => {
        const { message, status, data } = res.body;
        expect(status).to.equal('success');
        expect(message).to.equal('order created successfully!');
        expect(data).to.exist;
        done();
      });
  });

  it('Should fail to create an order if an invalid value was sent', (done) => {
    expect(process.env.AUTH_TOKEN).to.exist;

    chai
      .request(app)
      .post(`${baseUrl}`)
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
      .send({
        books: {
          '7TtlpKGz22': 'invalid value',
          '2gIsC7wawX': 2
        }
      })
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal("\"books.7TtlpKGz22\" must be a number");
        done();
      });
  });

  it('Should fail to create an order if an empty object is sent as books', (done) => {
    expect(process.env.AUTH_TOKEN).to.exist;

    chai
      .request(app)
      .post(`${baseUrl}`)
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
      .send({ books: {} })
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal('The books field must contain at least one book entry.');
        done();
      });
  });

  it('Should fail to create an order if a books field was not provided', (done) => {
    expect(process.env.AUTH_TOKEN).to.exist;

    chai
      .request(app)
      .post(`${baseUrl}`)
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
      .send({})
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal('The books field is required.');
        done();
      });
  });

  it('Should fail to fetch orders if an invalid authentication token was provided', (done) => {
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

  it('Should fail to fetch orders if no authentication token was provided', (done) => {
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

  it('Should successfuly fetch orders without pagination', (done) => {
    expect(process.env.AUTH_TOKEN).to.exist;

    chai
      .request(app)
      .get(`${baseUrl}`)
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
      .end((err, res) => {
        const { message, status, data } = res.body;
        expect(status).to.equal('success');
        expect(message).to.equal('orders fetched successfully!');
        expect(data).to.exist;
        done();
      });
  });

  it('Should successfuly fetch orders with pagination', (done) => {
    expect(process.env.AUTH_TOKEN).to.exist;

    chai
      .request(app)
      .get(`${baseUrl}?page=1&limit=10`)
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
      .end((err, res) => {
        const { message, status, data } = res.body;
        expect(status).to.equal('success');
        expect(message).to.equal('orders fetched successfully!');
        expect(data).to.exist;
        done();
      });
  });
});
