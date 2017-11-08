const jwt = require('./JWT');

module.exports = (passport) => {
    // use strategies
    passport.use(jwt);
};
