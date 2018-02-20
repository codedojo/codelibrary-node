const express = require('express');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { expect } = require('chai');

const { Book } = require('../../shared/models');
const bookRuter = require('./book');

const app = express();

app.use(express.json());
app.use('/books', bookRuter);

const request = supertest(app);

describe('/api', () => {
    let book1 = new Book({ slug: 'js', title: 'JavaScript' });
    let book2 = new Book({ slug: 'node', title: 'Node.js' });
    let book3 = new Book({ slug: 'mongo', title: 'MongoDB' });

    before('Connect to db', () => {
        return mongoose.connect('mongodb://localhost:27017/codelibrary-test');
    });

    before('Initialize db', () => {
        return Book.insertMany([book1, book2, book3]);
    });

    after('Clean db', () => {
        return Book.deleteMany({});
    });
    
    after('Disconnect from db', () => {
        return mongoose.disconnect();
    });

    describe('/books', () => {
        describe('GET', () => {
            it('should return a list of books', () => {
                return request.get('/books')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.have.length(3);
                    });
            });
        });

        describe('POST', () => {
            it('should create a new book', () => {
                return request.post('/books')
                    .set('Content-Type', 'application/json')
                    .send({ slug: 'react', title: 'React' })
                    .expect(201)
                    .then(res => {
                        expect(res.body.title).to.equal('React');
                    });
            });
        });
    });

    describe('/books/:id', () => {
        describe('GET', () => {
            it('should return a book by id', () => {
                return request.get('/books/node')
                    .expect(200)
                    .then(res => {
                        expect(res.body.slug).to.equal('node');
                    });
            });
        });

        describe('PUT', () => {
            it('should update the book', () => {
                return request.put('/books/node')
                    .set('Content-Type', 'application/json')
                    .send({ slug: 'nodejs' })
                    .expect(201)
                    .then(res => {
                        expect(res.body.slug).to.equal('nodejs');
                    });
            });
        });

        describe('DELETE', () => {
            it('should delete the book', () => {
                return request.delete('/books/nodejs')
                    .expect(204);
            });
        });
    });

    describe('/books/:id/likes', () => {
        describe('PUT', () => {
            it('should update the likes of the book', () => {
                return request.put('/books/react/likes')
                    .expect(201)
                    .then(res => {
                        expect(typeof res.body).to.equal('number');
                    });
            });
        });
    });
});