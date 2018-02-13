const expect = require('chai');
const sinon = require('sinon');

const bookController = require('./book');

describe('bookController', function() {
    describe('books', function() {
        describe('post', function() {
            it('should create a new book', function() {    
                const req = {
                    body: {}
                };
                const res = {
                    status: sinon.spy(),
                    send: sinon.spy()
                };
    
                bookController.books.post
    
                expect(res.status.calledWith(400)).to.equal(true, 'Bad status', res.status.args[0][0]);
                expect(res.send.calledWith('Title is required')).to.equal(true);
            });
        });
    });
});