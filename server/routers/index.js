const express = require('express');
const httpProxy = require('http-proxy');
const url = require('url');
const util = require('util');

const router = express.Router();

function inspect(object) {
    return util.inspect(object, { showHidden: false, depth: 5, colors: false });
}

function getPath(protocol, hostname, port, pathname) {
    return url.format({ protocol, hostname, port, pathname });
}

function createBackendProxy(pach, log) {
    const proxy = httpProxy.createProxyServer({
        target: pach,
        xfwd: false,
        changeOrigin: true,
        cookieDomainRewrite: {
            '*': '',
        },
    });

    proxy.on('error', (err, req, res) => {
        res.writeHead(500, {
            'Content-Type': 'text/plain',
        });

        log.error('Error in proxy pass: ', err);
        log.error(`${pach}${req.url}: ${inspect(req.body)}`);

        res.end('Something went wrong. Check availability of the API server.');
    });

    proxy.on('proxyReq', (proxyReq, req) => {
        const origin = getPath(req.protocol, req.client.address().address, req.client.address().port, req.originalUrl);

        // This is necessary to correctly deliver request body
        if (req.body && Object.keys(req.body).length !== 0) {
            proxyReq.write(JSON.stringify(req.body));
        }

        log.info(`Proxy request:\n ${inspect({
            method: req.method,
            origin,
            referer: `${pach}${req.path}`,
            body: req.body,
        })}`);
    });

    proxy.on('proxyRes', (proxyRes, req) => {
        log.debug(`Proxy ${pach}${req.path} response:\n ${inspect(proxyRes.headers)}`);
    });

    return proxy;
}

const apiRouter = (config, log) => {
    const apiPath = getPath(config.get('server:apiProtocol'), config.get('server:apiHost'),
        config.get('server:apiPort'), config.get('server:apiPrefix'));

    log.info(`REST API path: ${apiPath}`);

    const apiProxyBackend = createBackendProxy(apiPath, log);

    return (req, res) => {
        apiProxyBackend.web(req, res);
    };
};

module.exports = (config, log) => {
    router.all('/api/*', apiRouter(config, log));

    return router;
};
