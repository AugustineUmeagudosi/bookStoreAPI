/* eslint-disable import/no-cycle */
import Chance from 'chance';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Redis from 'ioredis';
import crypto from 'crypto';
import db from '../db';

const chance = new Chance();
let redisClient = null;

/**
 * Creates a redis connection instance
 * @static
 * @memberof Helper
 * @returns { Redis } an instance of a redis db connection
 */
export const RedisClient = () => {
  if (redisClient) return redisClient;

  redisClient = new Redis(process.env.REDIS_URL);
  return redisClient;
};

/**
 * validates an input based on a schema
 * @static
 * @param { Joi } schema - The validation schema.
 * @param { Object } object - The data to be validated
 * @memberof Helper
 * @returns { boolean }
 */
export const validateInput = async (schema, object) => schema.validateAsync(object);

/**
 * This generates random string
 * @static
 * @memberof Helper
 * @returns { string | number } - generate unique token.
*/
export const generateToken = (length) => chance.string({ length, alpha: true, numeric: true });

/**
 * This checks if a plain text matches a certain hash value by generating
 * @param {string} plainPassword - plain text to be used in the comparison.
 * @param {string} hashedPassword - hashed value created with the salt.
 * @memberof Helper
 * @returns {boolean} - returns a true or false, depending on the outcome of the comparison.
 */
export const comparePassword = (plainPassword, hashedPassword) => {
  const result = bcrypt.compareSync(plainPassword, hashedPassword);
  return result;
};

/**
 * This is used for generating a hash and a salt from a String.
 * @param {string} password - String to be encrypted.
 * @memberof Helper
 * @returns {Object} - An object containing the hash and salt of a String.
 */
export const hashPassword = (password) => bcrypt.hash(password, 10);

/**
 * generate JWT token
 * @static
 * @memberof Helper
 * @returns {String}
 */
// eslint-disable-next-line max-len
export const generateAuthToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' });
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  RedisClient().setex(hashedToken, 86400, 1); // 86400 is one day in seconds
  return token;
};

/**
 * This verify the JWT token with the secret with which the token was issued with
 * @param {string} token - JWT Token
 * @memberof AuthHelper
 * @returns {string | number | Buffer | object } - Decoded JWT payload if
 * token is valid or an error message if otherwise.
 */
export const verifyToken = (token, returnError = false) => {
  if (!returnError) return jwt.verify(token, process.env.JWT_SECRET);

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return error;
  }
};

/**
 * Fetches a paginated collection of a resource.
 * @static
 * @param {Object} options - configuration options.
 * @param {number} options.page - Current page e.g: 1 represents first
 * 10 records by default and 2 represents the next 10 records.
 * @param {number} options.limit - Max number of records.
 * @param {number} options.getCount - Max number of records.
 * @param {number} options.getResources - Max records in the current page
 * @param {Array} options.params - Extra parameters for the get resources query.
 * @param {Array} options.countParams - Extra parameters for the get count query.
 * @memberof Helper
 * @returns {Promise} - Returns a promise array of the count and the resources
*/
export const fetchResourceByPage = async (payload) => {
  const {
    page = 1,
    limit = 10,
    getCount,
    getResources,
    params = [],
    countParams = []
  } = payload;

  const offSet = (page - 1) * +limit;
  let fetchCount;

  fetchCount = await db.oneOrNone(getCount, [...countParams]);
  if (!fetchCount) fetchCount = { count: 0 };

  const fetchCountResource = db.any(getResources, [offSet, +limit, ...params]);
  return Promise.all([fetchCount, fetchCountResource]);
};

/**
 * calculate number of pages
 * @static
 * @param { Number } total - Total number of a particular resource.
 * @param { Number } limit - The total number of resource to be displayed per page
 * @memberof Helper
 * @returns { Number } - Returns the display page value.
*/
export const calculatePages = (total, limit = 10) => {
  const displayPage = Math.floor(total / +limit);
  return total % +limit ? displayPage + 1 : displayPage;
};
