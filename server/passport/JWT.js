const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const SECRET = config.get('server:secret');
const DEFAULT_ROLE = 'user';

/**
 * Create jwt token by user id
 * @param _id - User id
 */
module.exports.sign = _id => new Promise((resolve, reject) => {
    if (!_id) {
        reject(new Error('User id not defined'));
    } else {
        const iat = Math.floor(Date.now() / 1000) - 30; // backdate a jwt 30 seconds
        const exp = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hour before expiration
        const aud = DEFAULT_ROLE; // by default

        const payload = {
            _id,
            aud, // audience
            iat, // issued at
            exp, // expire time
        };

        jwt.sign(payload, SECRET, (err, token) => {
            if (err) return reject(err);
            return resolve(token);
        });
    }
});

/**
 * Verify token and role
 * @param token - jwt token
 * @param aud - user role
 */
module.exports.verify = (token, aud) => new Promise((resolve, reject) => {
    if (!token) {
        reject(new Error('Token id not defined'));
    } else {
        jwt.verify(token, SECRET, { audience: aud || DEFAULT_ROLE }, (err, decoded) => {
            if (err) return reject(err);
            return resolve(decoded);
        });
    }
});
