const express = require('express');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { expect } = require('chai');

const { User } = require('../../shared/models');
const authRouter = require('./auth');
const bookRouter = require('./book');

const app = express();

app.use(express.json());
app.use(authRouter);
app.use('/books', bookRouter);

const agent = supertest.agent(app);

describe('/api', () => {
    let token;

    before('Connect to db', () => {
        return mongoose.connect('mongodb://localhost:27017/codelibrary-test');
    });

    before('Create a new user', function() {
        this.timeout(10000);

        return User.create({ email: 'olegpolyakov@outlook.com', password: '12345' });
    });

    after('Delete the user', () => {
        return User.deleteMany({});
    });
    
    after('Disconnect from db', () => {
        return mongoose.disconnect();
    });

    beforeEach(() => {
        return agent.post('/token')
            .send({ email: 'olegpolyakov@outlook.com', password: '12345' })
            .expect(200)
            .then(res => {
                console.log(res.body.token);
            });
    });

    describe('/token', () => {
        describe('POST', () => {
            it('return a token', () => {
                expect(token).to.exist;
            });
        });
    });

    describe('/books', () => {
        describe('GET', () => {
            it('returns a 401 status for an unauthenticated user', () => {
                return agent.get('/books')
                    .expect(200);
            });

            it('returns a 200 status for an authenticated user', () => {
                return agent.get('/books')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200);
            });
        });
    });
});