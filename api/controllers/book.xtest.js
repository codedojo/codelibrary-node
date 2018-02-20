const { expect } = require('chai');
const sinon = require('sinon');

const configureBookController = require('./book');

describe('bookController', () => {
    const BOOKS = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const BOOK = { id: 1 };

    class Book {
        static find() {}
        static create() {}
    }

    sinon.stub(Book, 'find').resolves(BOOKS);
    sinon.stub(Book, 'create').resolves(BOOK);

    const bookController = configureBookController(Book);

    describe('books', () => {
        describe('get', () => {
            it('should send an array with status 200', () => {
                let req = {};
                let res = {
                    status: sinon.stub().returnsThis(),
                    json: sinon.spy()
                };

                return bookController.books.get(req, res)
                    .then(() => {
                        expect(res.status.calledOnce).to.equal(true, '`res.status` is not called at least once');
                        expect(res.status.calledWith(200)).to.equal(true);
                        expect(res.json.calledWith(BOOKS)).to.equal(true);
                    });
            });
        });
    });

    describe('post', () => {
        it('should send and object with status 201', () => {    
            const req = {
                body: { slug: '', title: '' }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };

            return bookController.books.post(req, res)
                .then(() => {
                    expect(res.status.calledWith(201)).to.equal(true);
                    expect(res.json.calledWith(BOOK)).to.equal(true);
                });
        });
    });
});