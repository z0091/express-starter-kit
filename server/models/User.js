/* eslint-disable func-names */

const _ = require('lodash');
const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;


/**
 * User Schema
 */
const UserSchema = new Schema({
    name: {
        type: String,
        default: '',
        validate: {
            isAsync: true,
            validator(name, cb) {
                const User = mongoose.model('User');

                // Check only when it is a new user
                if (this.isNew) {
                    User.find({ name }).exec((err, users) => {
                        cb(!err && users.length === 0);
                    });
                } else cb(true);
            },
            message: 'User already exists',
        },
    },
    username: { type: String, default: '' },
    passwordHash: { type: String, select: false, default: '' },
    salt: { type: String, select: false, default: '' },
    failedLoginCount: { type: Number, default: 0 },
    loginCount: { type: Number, default: 0 },
    blocked: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now },
});


/**
 * Virtuals
 */
UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.passwordHash = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });


/**
 * Validations
 */
const validatePresenceOf = value => value && value.length;

UserSchema.path('name').validate(validatePresenceOf, 'Name cannot be blank');

UserSchema.path('username').validate(validatePresenceOf, 'Username cannot be blank');

UserSchema.path('passwordHash').validate(function (passwordHash) {
    return passwordHash.length && this._password.length;
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
    if (!validatePresenceOf(this.password) || !this.isNew) {
        next(new Error('Invalid password'));
    } else {
        next();
    }
});


UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate(plainText) {
        return this.encryptPassword(plainText) === this.passwordHash;
    },
    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt() {
        return `${Math.round((new Date().valueOf() * Math.random()))}`;
    },
    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword(password) {
        if (!password) return '';
        try {
            // TODO посмотреть в сторону bcrypt.
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },

    /**
     * Check active user
     * @return {boolean}
     */
    isActive() {
        return !!this.active;
    },
};

/**
 * Statics
 */
UserSchema.statics = {

    /**
     * Load
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */
    load({ criteria, select = 'name username' }, cb) {
        return this.findOne(criteria)
            .select(select)
            .exec(cb);
    },

    /**
     * @param {ObjectId} _id
     * @return {Promise}
     */
    incrementLoginCount(_id) {
        return this.findByIdAndUpdate(_id, { $inc: { loginCount: 1 } })
            .then(loginCount => loginCount);
    },

    /**
     * @param {ObjectId} _id
     * @return {Promise}
     */
    incrementFailedLoginCount(_id) {
        return this.findByIdAndUpdate(_id, { $inc: { failedLoginCount: 1 } })
            .then(failedLoginCount => failedLoginCount);
    },

    /**
     * Check user by name and password
     * @param {String} name
     * @param {String} password
     * @returns {Promise}
     * @api private
     */
    checkByLoginAndPassword(name = '', password = '') {
        return new Promise((resolve, reject) => {
            this.findOne({ name })
                .select('+passwordHash +salt')
                .then((user) => {
                    if (user) {
                        if (user.authenticate(password)) {
                            // user should be active
                            if (user.isActive()) {
                                // mark login as successful
                                this.incrementLoginCount(user._id);

                                return resolve(_.omit(user.toObject(), ['passwordHash', 'salt']));
                            }
                        } else {
                            // mark login as failed
                            this.incrementFailedLoginCount(user._id);
                        }
                    }
                    return reject();
                })
                .catch(reject);
        });
    },

    /**
     * Create new user
     * @param {String} name
     * @param {String} username
     * @param {String} password
     * @returns {Promise}
     * @api private
     */
    createNewUser(name = '', username = '', password = '') {
        return new Promise((resolve, reject) => {
            this.create({
                name,
                username,
                password,
            }, (err, small) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(small);
                }
            });
        });
    },
};

module.exports = mongoose.model('User', UserSchema);
