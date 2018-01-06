/* eslint-disable no-console */
const mongoose = require('mongoose');
const { expect } = require('chai');

mongoose.Promise = Promise;


describe('Database Tests', () => {
    const Category = require('../../../server/models/Category');

    before((done) => {
        mongoose.connect('mongodb://localhost/testDatabase', {
            useMongoClient: true,
        });

        mongoose.connection
            .on('error', console.error.bind(console, 'connection error'))
            .once('open', () => {
                console.log('We are connected to test database!');
                done();
            });
    });

    describe('Category model tests', () => {
        const rootCategory = new Category({
            name: 'root',
            alias: 'root',
        });

        const subCategory = new Category({
            name: 'sub',
            alias: 'sub',
            parent: rootCategory._id,
        });

        it('Создание подкатегорий', () => Promise.all([rootCategory.save(), subCategory.save()]));

        it('Родительская категория должна включать подкатегорию', () => Category
            .findById(rootCategory._id)
            .populate('children')
            .exec()
            .then(({ children }) => {
                expect(children).to.be.an('array').that.not.be.empty;
            }));
    });

    after((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });
});
