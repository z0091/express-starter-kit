const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../../config/config');
const { User } = require('../models/index');

const options = {
    jwtFromRequest: ExtractJwt.fromHeader('jwt'),
    secretOrKey: config.get('server:secret'),
};

// JSON Web Token strategy
module.exports = new Strategy(options, (jwt_payload, next) => {
    User
        .load({
            criteria: { _id: jwt_payload.id },
        })
        .then(user => next(null, user))
        .catch(() => next(null, false));
});
