const bodyParser = require('body-parser');

/**
 * Return true, if multipart request
 * @param req
 * @returns {boolean}
 */
const isMultipartRequest = (req) => {
    const contentTypeHeader = req.headers['content-type'];
    return contentTypeHeader && contentTypeHeader.indexOf('multipart') > -1;
};

module.exports.bodyParserJsonMiddleware = () => (
    (req, res, next) => {
        if (isMultipartRequest(req)) {
            return next();
        }
        return bodyParser.json({ limit: '10mb' })(req, res, next);
    }
);

module.exports.bodyParserUrlencodedMiddleware = () => (
    (req, res, next) => {
        if (isMultipartRequest(req)) {
            return next();
        }
        return bodyParser.urlencoded({ limit: '10mb', extended: true })(req, res, next);
    }
);
