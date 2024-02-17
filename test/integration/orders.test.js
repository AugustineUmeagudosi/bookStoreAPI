/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1/orders';

describe('Customer Routes', () => {
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
        },
        paymentMethod: 'cash'
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
        },
        paymentMethod: 'cash'
      })
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal("\"books.7TtlpKGz22\" must be a number");
        done();
      });
  });

  it('Should fail to create an order if a paymentMethod field was not provided', (done) => {
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
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal('payment method is a required field');
        done();
      });
  });

  it('Should fail to create an order if a books field was not provided', (done) => {
    expect(process.env.AUTH_TOKEN).to.exist;

    chai
      .request(app)
      .post(`${baseUrl}`)
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN}`)
      .send({
        paymentMethod: 'cash'
      })
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal('"books" is required');
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
