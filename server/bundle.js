/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(25)('wks')
  , uid        = __webpack_require__(26)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(5)
  , createDesc = __webpack_require__(15);
module.exports = __webpack_require__(7) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(6)
  , IE8_DOM_DEFINE = __webpack_require__(52)
  , toPrimitive    = __webpack_require__(53)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(14)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(9);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(25)('keys')
  , uid    = __webpack_require__(26);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(1)
  , ctx       = __webpack_require__(28)
  , hide      = __webpack_require__(4)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var nconf = __webpack_require__(57);
var path = __webpack_require__(17);
var defaultConf = __webpack_require__(58);

nconf.use('memory').env().argv().file(path.resolve(__dirname, '../local.conf.json')).defaults(defaultConf);

module.exports = nconf;
/* WEBPACK VAR INJECTION */}.call(exports, "config"))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("log4js");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(46)
  , enumBugKeys = __webpack_require__(27);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(47)
  , defined = __webpack_require__(9);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(10)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(51);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(61);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f
  , has = __webpack_require__(3)
  , TAG = __webpack_require__(0)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable global-require*/

__webpack_require__(34);
var express = __webpack_require__(19);
var cookieParser = __webpack_require__(35);
var compress = __webpack_require__(36);
var log4js = __webpack_require__(20);
var history = __webpack_require__(37);

var bodyParserMiddleware = __webpack_require__(38);
var routers = __webpack_require__(40);
var config = __webpack_require__(16);
var log = __webpack_require__(60);

var port = config.get('server:port');
var host = config.get('server:host');
var assetsPath = config.get('app:assetsPath');
var distPath = config.get('dist:path');
var isDebug = !config.get('release');
var hotModuleReplacement = config.get('hotWebpack');

// Create app
var app = express();

app.use(log4js.connectLogger(log.http));
app.use(history());

app.use(cookieParser());
app.use(compress()); // Apply gzip compression

app.use(bodyParserMiddleware.bodyParserJsonMiddleware());
app.use(bodyParserMiddleware.bodyParserUrlencodedMiddleware());
app.use('/assets', express.static(assetsPath));

if (isDebug) {
    var webpack = __webpack_require__(32);
    var webpackConfig = __webpack_require__(80);
    var compiler = webpack(webpackConfig);

    log.info('Debug mode is true');
    app.use(__webpack_require__(84)(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: webpackConfig.stats
    }));
    if (hotModuleReplacement) {
        log.info('Enable webpack [HRM] middleware');
        app.use(__webpack_require__(85)(compiler));
    }
} else {
    app.use(express.static(distPath));
}

app.use('/', routers(config, log.api));

// And run the server
app.listen(port, host, function () {
    log.info('Server is running. Please open http://' + host + ':' + port + '/');
});

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("connect-history-api-fallback");

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bodyParser = __webpack_require__(39);

/**
 * Return true, if multipart request
 * @param req
 * @returns {boolean}
 */
var isMultipartRequest = function isMultipartRequest(req) {
    var contentTypeHeader = req.headers['content-type'];
    return contentTypeHeader && contentTypeHeader.indexOf('multipart') > -1;
};

module.exports.bodyParserJsonMiddleware = function () {
    return function (req, res, next) {
        if (isMultipartRequest(req)) {
            return next();
        }
        return bodyParser.json({ limit: '10mb' })(req, res, next);
    };
};

module.exports.bodyParserUrlencodedMiddleware = function () {
    return function (req, res, next) {
        if (isMultipartRequest(req)) {
            return next();
        }
        return bodyParser.urlencoded({ limit: '10mb', extended: true })(req, res, next);
    };
};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(41);

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = __webpack_require__(43);

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = __webpack_require__(19);
var httpProxy = __webpack_require__(54);
var url = __webpack_require__(55);
var util = __webpack_require__(56);

var router = express.Router();

function inspect(object) {
    return util.inspect(object, { showHidden: false, depth: 5, colors: false });
}

function getPath(protocol, hostname, port, pathname) {
    return url.format({ protocol: protocol, hostname: hostname, port: port, pathname: pathname });
}

function createBackendProxy(pach, log) {
    var proxy = httpProxy.createProxyServer({
        target: pach,
        xfwd: false,
        changeOrigin: true,
        cookieDomainRewrite: {
            '*': ''
        }
    });

    proxy.on('error', function (err, req, res) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        log.error('Error in proxy pass: ', err);
        log.error('' + pach + req.url + ': ' + inspect(req.body));

        res.end('Something went wrong. Check availability of the API server.');
    });

    proxy.on('proxyReq', function (proxyReq, req) {
        var origin = getPath(req.protocol, req.client.address().address, req.client.address().port, req.originalUrl);

        // This is necessary to correctly deliver request body
        if (req.body && (0, _keys2.default)(req.body).length !== 0) {
            proxyReq.write((0, _stringify2.default)(req.body));
        }

        log.info('Proxy request:\n ' + inspect({
            method: req.method,
            origin: origin,
            referer: '' + pach + req.path,
            body: req.body
        }));
    });

    proxy.on('proxyRes', function (proxyRes, req) {
        log.debug('Proxy ' + pach + req.path + ' response:\n ' + inspect(proxyRes.headers));
    });

    return proxy;
}

var apiRouter = function apiRouter(config, log) {
    var apiPath = getPath(config.get('server:apiProtocol'), config.get('server:apiHost'), config.get('server:apiPort'), config.get('server:apiPrefix'));

    log.info('REST API path: ' + apiPath);

    var apiProxyBackend = createBackendProxy(apiPath, log);

    return function (req, res) {
        apiProxyBackend.web(req, res);
    };
};

module.exports = function (config, log) {
    router.all('/api/*', apiRouter(config, log));

    return router;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(1)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45);
module.exports = __webpack_require__(1).Object.keys;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(8)
  , $keys    = __webpack_require__(21);

__webpack_require__(50)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(3)
  , toIObject    = __webpack_require__(22)
  , arrayIndexOf = __webpack_require__(48)(false)
  , IE_PROTO     = __webpack_require__(11)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(23);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(22)
  , toLength  = __webpack_require__(24)
  , toIndex   = __webpack_require__(49);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(10)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(12)
  , core    = __webpack_require__(1)
  , fails   = __webpack_require__(14);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(14)(function(){
  return Object.defineProperty(__webpack_require__(29)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(13);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("http-proxy");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("nconf");

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var path = __webpack_require__(17);
var packageInfo = __webpack_require__(59);

module.exports = {
    version: packageInfo.version,
    name: packageInfo.name,
    release: false,
    verbose: false,
    hotWebpack: false,
    app: {
        assetsPath: path.resolve(__dirname, '../assets'),
        srcPath: path.resolve(__dirname, '../src'),
        devtool: 'cheap-module-eval-source-map',
        apiPrefix: '/api',
        printerPrefix: '/print'
    },
    dist: {
        path: path.resolve(__dirname, '../dist'),
        devtool: ''
    },
    log: {
        dev: {
            replaceConsole: true,
            level: 'info',
            usefiles: false,
            files: [{
                type: 'file',
                filename: 'log/app-dev.log',
                maxLogSize: 10485760,
                numBackups: 3
            }, {
                type: 'file',
                filename: 'log/api-dev.log',
                maxLogSize: 10485760,
                numBackups: 3,
                category: 'api'
            }],
            console: true
        },
        prod: {
            replaceConsole: true,
            level: 'info',
            usefiles: false,
            files: [{
                type: 'file',
                filename: 'log/app-prod.log',
                maxLogSize: 10485760,
                numBackups: 3
            }, {
                type: 'file',
                filename: 'log/api-prod.log',
                maxLogSize: 10485760,
                numBackups: 3,
                category: 'api'
            }],
            console: false
        }
    },
    server: {
        port: '9987',
        host: '127.0.0.1',
        apiProtocol: 'http',
        apiHost: '127.0.0.1',
        apiPort: '8000',
        apiPrefix: '/api'
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, "config"))

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = {
	"name": "express-starter-kit",
	"version": "0.0.0",
	"description": "",
	"scripts": {
		"start": "node server/index.js",
		"build": "$(npm bin)/babel-node utils/run build --release",
		"bundle:server": "$(npm bin)/babel-node utils/run bundle.server --release"
	},
	"engines": {
		"node": ">=6.9.5"
	},
	"devDependencies": {
		"babel-cli": "^6.24.0",
		"babel-core": "^6.24.0",
		"babel-eslint": "^7.2.1",
		"babel-loader": "^7.1.1",
		"babel-plugin-dynamic-import-node": "^1.0.1",
		"babel-plugin-rewire": "^1.0.0",
		"babel-plugin-transform-async-to-generator": "^6.22.0",
		"babel-plugin-transform-decorators-legacy": "^1.3.4",
		"babel-plugin-transform-runtime": "^6.23.0",
		"babel-polyfill": "^6.23.0",
		"babel-preset-env": "^1.3.2",
		"babel-preset-stage-0": "^6.22.0",
		"copy-webpack-plugin": "^4.0.1",
		"css-loader": "^0.28.4",
		"eslint": "^4.2.0",
		"eslint-config-airbnb-base": "^11.2.0",
		"eslint-plugin-import": "^2.7.0",
		"eslint-plugin-promise": "^3.5.0",
		"extract-text-webpack-plugin": "^3.0.0",
		"html-webpack-plugin": "^2.29.0",
		"less": "^2.7.2",
		"less-loader": "^4.0.5",
		"style-loader": "^0.18.2",
		"webpack": "^3.3.0",
		"webpack-dev-middleware": "^1.11.0",
		"webpack-hot-middleware": "^2.18.2"
	},
	"author": "",
	"license": "ISC",
	"dependencies": {
		"babel-polyfill": "^6.23.0",
		"body-parser": "^1.17.2",
		"compression": "^1.7.0",
		"connect-history-api-fallback": "^1.3.0",
		"cookie-parser": "^1.4.3",
		"express": "^4.15.3",
		"http-proxy": "^1.16.2",
		"url": "^0.11.0",
		"util": "^0.10.3",
		"log4js": "^1.1.1",
		"nconf": "^0.8.4"
	}
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _toConsumableArray2 = __webpack_require__(30);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log4js = __webpack_require__(20);
var config = __webpack_require__(16);

var isDebug = !config.get('release');
var logConf = config.get('log:' + (isDebug ? 'dev' : 'prod'));

log4js.configure({
    replaceConsole: logConf.replaceConsole,
    levels: {
        '[all]': logConf.level
    },
    appenders: [{
        type: 'clustered',
        appenders: [].concat((0, _toConsumableArray3.default)(logConf.console ? [{ type: 'console' }] : []), (0, _toConsumableArray3.default)(logConf.usefiles && logConf.files ? logConf.files : []))
    }]
});

module.exports = log4js.getLogger('app');
module.exports.api = log4js.getLogger('api');
module.exports.http = log4js.getLogger('http');

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(63);
__webpack_require__(73);
module.exports = __webpack_require__(1).Array.from;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(64)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(65)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(10)
  , defined   = __webpack_require__(9);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(66)
  , $export        = __webpack_require__(12)
  , redefine       = __webpack_require__(67)
  , hide           = __webpack_require__(4)
  , has            = __webpack_require__(3)
  , Iterators      = __webpack_require__(18)
  , $iterCreate    = __webpack_require__(68)
  , setToStringTag = __webpack_require__(31)
  , getPrototypeOf = __webpack_require__(72)
  , ITERATOR       = __webpack_require__(0)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(69)
  , descriptor     = __webpack_require__(15)
  , setToStringTag = __webpack_require__(31)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(4)(IteratorPrototype, __webpack_require__(0)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(6)
  , dPs         = __webpack_require__(70)
  , enumBugKeys = __webpack_require__(27)
  , IE_PROTO    = __webpack_require__(11)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(29)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(71).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(5)
  , anObject = __webpack_require__(6)
  , getKeys  = __webpack_require__(21);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(3)
  , toObject    = __webpack_require__(8)
  , IE_PROTO    = __webpack_require__(11)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(28)
  , $export        = __webpack_require__(12)
  , toObject       = __webpack_require__(8)
  , call           = __webpack_require__(74)
  , isArrayIter    = __webpack_require__(75)
  , toLength       = __webpack_require__(24)
  , createProperty = __webpack_require__(76)
  , getIterFn      = __webpack_require__(77);

$export($export.S + $export.F * !__webpack_require__(79)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(6);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(18)
  , ITERATOR   = __webpack_require__(0)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(5)
  , createDesc      = __webpack_require__(15);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(78)
  , ITERATOR  = __webpack_require__(0)('iterator')
  , Iterators = __webpack_require__(18);
module.exports = __webpack_require__(1).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(23)
  , TAG = __webpack_require__(0)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(0)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _toConsumableArray2 = __webpack_require__(30);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var webpack = __webpack_require__(32);
var path = __webpack_require__(17);
var HtmlWebpackPlugin = __webpack_require__(81);
var ExtractTextPlugin = __webpack_require__(82);
var CopyWebpackPlugin = __webpack_require__(83);
var config = __webpack_require__(16);

var version = config.get('version');
var appName = config.get('name');
var srcPath = config.get('app:srcPath');
var assetsPath = config.get('app:assetsPath');
var distPath = config.get('dist:path');
var isRelease = config.get('release');
var isDebug = !isRelease;
var isVerbose = config.get('verbose');
var hotModuleReplacement = config.get('hotWebpack') && isDebug;
var devtool = isDebug ? config.get('app:devtool') : config.get('dist:devtool');

var entry = [].concat((0, _toConsumableArray3.default)(hotModuleReplacement ? ['webpack-hot-middleware/client?reload=true'] : []), [path.resolve(srcPath, 'less/styles.less'), 'babel-polyfill', path.resolve(srcPath, 'index.js')]);

var extractLess = new ExtractTextPlugin({
    filename: 'css/[name]-' + version + '-[hash].css',
    disable: isDebug
});

module.exports = {
    context: srcPath,
    resolve: {
        modules: [srcPath, 'node_modules'],
        alias: {}
    },
    output: {
        filename: 'app-' + version + '-[hash]' + (isRelease ? '.min' : '') + '.js',
        path: distPath,
        publicPath: '/'
    },

    module: {
        noParse: [/handsontable.full.js/],
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /(node_modules)/
        }, { test: /\.hbs$/, use: ['handlebars-template-loader'] }, {
            test: /(\.css|\.less)$/,
            use: extractLess.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        sourceMap: isDebug,
                        modules: false,
                        minimize: isRelease
                    }
                }, {
                    loader: 'less-loader',
                    options: {
                        sourceMap: isDebug
                    }
                }],
                fallback: 'style-loader'
            })
        }, {
            test: /\.txt$/,
            use: ['raw-loader']
        }, {
            test: /\.(png|jpe?g|gif|svg)$/,
            loader: 'url-loader',
            options: {
                name: isDebug ? 'assets/img/[name].[ext]?[hash]' : 'assets/img/[hash].[ext]',
                limit: 10000
            }
        }, {
            test: /\.(woff|woff2|eot|ttf)$/,
            loader: 'file-loader',
            options: {
                name: isDebug ? 'assets/fonts/[name].[ext]?[hash]' : 'assets/fonts/[hash].[ext]'
            }
        }]
    },

    plugins: [extractLess, new webpack.ContextReplacementPlugin(/moment\/locale/, /en-gb/), new HtmlWebpackPlugin({
        app_name: appName,
        template: path.resolve(srcPath, 'index.html'),
        hash: false,
        version: version,
        api_prefix: config.get('app:apiPrefix'),
        printer_prefix: config.get('app:printerPrefix'),
        favicon: path.resolve(assetsPath, './img/favicon.png'),
        filename: 'index.html',
        inject: 'body'
    }), new webpack.ProvidePlugin({}), new webpack.NoEmitOnErrorsPlugin(), new webpack.LoaderOptionsPlugin({
        debug: isDebug,
        minimize: isRelease
    })].concat((0, _toConsumableArray3.default)(hotModuleReplacement ? [new webpack.HotModuleReplacementPlugin()] : []), (0, _toConsumableArray3.default)(isDebug ? [] : [new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }), new CopyWebpackPlugin([{
        context: assetsPath,
        from: '**/*',
        to: 'assets/'
    }, {
        from: './robots.txt'
    }]), new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            screw_ie8: true,
            warnings: isVerbose
        }
    })])),

    entry: entry,
    devtool: devtool,
    cache: isDebug,

    stats: {
        colors: true,
        modules: isVerbose,
        reasons: isDebug,
        hash: isVerbose,
        version: isVerbose,
        timings: true,
        chunks: isVerbose,
        chunkModules: isVerbose,
        cached: isVerbose,
        cachedAssets: isVerbose
    }
};

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = require("html-webpack-plugin");

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = require("extract-text-webpack-plugin");

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = require("copy-webpack-plugin");

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ })
/******/ ]);