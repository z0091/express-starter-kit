const jwt = require('../passport/JWT');
const log = require('../log');

/**
 * Return route middleware to authorization
 * @param role - user roles Eg: "urn:foo", /urn:f[o]{2}/, [/urn:f[o]{2}/, "urn:bar"]
 * @return {Function}
 */
module.exports.checkAuthMiddleware = role => (req, res, next) => {
    const token = req.body.token || req.headers.jwt;

    if (token) {
        jwt.verify(token, role)
            .then((decoded) => {
                req.jwt = decoded;
                next();
            })
            .catch((error) => {
                log.app.error(`Verify JWT ${error}`);
                res.status(401);
                throw new Error('Invalid authorization');
            });
    } else {
        res.status(401);
        throw new Error('Invalid authorization');
    }
};
