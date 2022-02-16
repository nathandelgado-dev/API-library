const { request, response } = require('express');
const {Book, Category, User} = require('../models');
const {
    sendServerError,
    isExistBookName,
    regexUpperGlobal,
    notFoundBooks,
    foundBooks
} = require('../helpers');

const getAllBooks = async(req , res) => {
    try {
        const books = await Book.find({ status: true})
            .populate({path: 'category', select: 'name'})
            .populate({ path: 'borrowedToUser', select: 'email'});
    
        if(!books || books.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'There are no books'
            }); 
        }
    
        res.status(200).json({
            ok: true,
            amount: books.length,
            books
        });        
    } catch (err) {
        sendServerError(err, res);
    }
}

const getBook = async(req, res) => {
    try {
        const { id } = req.params;
    
        const bookSearched = await Book.findOne({ _id: id , status: true })
            .populate({ path: 'category', select: 'name' })
            .populate({ path: 'borrowedToUser', select: 'email'});
    
        if(!bookSearched) {
            return res.status(400).json({
                ok: false,
                msg: 'The book not exist or is inactive'
            });
        }
    
        res.status(200).json({
            ok: true,
            book: bookSearched
        });        
    } catch (err) {
        sendServerError(err, res);
    }
}

const createBook = async(req, res) => {
    try {
        const { name, author } = req.body;
        const nameUpperCase = name.toUpperCase();
    
        await isExistBookName(name, res);
    
        const newBook = new Book({
            name: nameUpperCase,
            author: author.toUpperCase()
        });
    
        await newBook.save();
    
        res.status(201).json({
            ok: true,
            msg: 'Saved Book'
        });   
    } catch (err) {
        sendServerError(err, res);
    }
}

const updateBook = async(req, res) => {
    try {
        const {id} = req.params;
        const {name, author, category} = req.body;
        
        if(!name && !author && !category) {
            return res.status(400).json({
                ok: false,
                msg: 'Should exist name, author or category in the request body'
            });
        }

        let nameUpperCase = null;
        let authorUpperCase = null;
        if(name) {
            nameUpperCase = name.toUpperCase();
        }
        if(author){
            authorUpperCase = author.toUpperCase();
        }

        const book = await Book.findById(id);

        const updateBook = {
            name: nameUpperCase || book.name,
            author: authorUpperCase || book.author,
            category: category || book.category,
            updatedAt: new Date()
        }

        const updatedBook = await Book.findByIdAndUpdate({ _id: book.id }, updateBook);

        res.status(201).json({
            ok: true,
            msg: `Updated book ${updatedBook.name}`
        });        
    } catch (err) {
        sendServerError(err, res);
    }
}

const deleteBook = async(req, res) => {
    try {
        const {id} = req.params;
    
        const book = await Book.findOne()
            .and([{ _id: id}, { status: true }]);
        
        if(!book) {
            return res.status(400).json({
                ok: false,
                msg: 'The book not exist or is inactive'
            });
        }
    
        const deletedBook = await Book.findByIdAndUpdate(id, { status: false });
    
        res.status(200).json({
            ok: true,
            msg: `Deleted book ${deletedBook.name}`
        });        
    } catch (err) {
        sendServerError(err, res);
    }
}

const avalibleBooks = async(req, res) => {
    try {
        const books = await Book.find({ amount: { $gt: 0 }})
            .populate({ path: 'category', select: 'name'});
    
        if(!books || books.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'There are no books available'
            });
        }
    
        res.status(200).json({
            ok: true,
            amount: books.length,
            books
        });        
    } catch (err) {
        sendServerError(err, res);
    }
}

const avalibleBook = async(req, res) => {
    try {
        const {id} = req.params;
        
        const book = await Book.findOne()
            .where({ _id: id} )
            .and({ amount: { $gt: 0 }})
            .populate({ path: 'category', select: 'name'});
    
        if(!book) {
            return res.status(400).json({
                ok: false,
                msg: 'There is not book available'
            });
        }
    
        res.status(200).json({
            ok: true,
            amount: book.amount,
            book
        });        
    } catch (err) {
        sendServerError(err, res);
    }
}

const queriesOfBooks = async(req, res) => {
    try {
        const {name = '', author = '', category = ''} = req.query;
        let books = null;
        let categorySearch = null;
        let regexAuthor = null;
        let regexName = null;
    
        if(name) {
            regexName = regexUpperGlobal(name);
        }
        if(author) {
            regexAuthor = regexUpperGlobal(author);
        }  
        if(category) {
            const regexCategory = regexUpperGlobal(category);

            categorySearch = async() => {
                const search = await Category.findOne({ name: regexCategory });
                if(search) {
                    return search; 
                }
            } 
        }
    
        if(name && author && category) {
            books = await Book.find()
                .and([
                    { name: regexName },
                    { author: regexAuthor },
                    { category: categorySearch.id}
                ])
                .populate({ path: 'category', select: 'name' });
    
            notFoundBooks(books, res);    
            foundBooks(books, res);
        }
        
        if(name && author) {
            books = await Book.find()
                .and([
                    { name: regexName },
                    { author: regexAuthor }
                ])
                .populate({ path: 'category', select: 'name' });
    
            notFoundBooks(books, res);    
            foundBooks(books, res);
        }
    
        if(name && category) {
            books = await Book.find()
                .and([
                    { name: regexName },
                    { category: categorySearch.id }
                ])
                .populate({ path: 'category', select: 'name' });
    
            notFoundBooks(books, res);    
            foundBooks(books, res);
        }
    
        if(author && category) {
            books = await Book.find()
                .and([
                    { author: regexAuthor },
                    { category: categorySearch.id }
                ])
                .populate({ path: 'category', select: 'name' });
    
            notFoundBooks(books, res);    
            foundBooks(books, res);
        }
    
        if(name) {
            books = await Book.find({ name: regexName })
                .populate({ path: 'category', select: 'name' });
    
            notFoundBooks(books, res);    
            foundBooks(books, res);
        }
        
        if(author) {
            books = await Book.find({ author: regexAuthor })
                .populate({ path: 'category', select: 'name' });
    
            notFoundBooks(books, res);    
            foundBooks(books, res);
        }
        
        if(category) {
            books = await Book.find({ category: categorySearch.id})
                .populate({ path: 'category', select: 'name' });
    
            notFoundBooks(books, res);    
            foundBooks(books, res);
        }        
    } catch (err) {
        sendServerError(err, res);
    }
}

const borrowBook = async(req, res) => {
    try {
        const {id} = req.params;
        const user = req.user;
        
        const book = await Book.findOne()
            .where()
            .and([{ _id: id}, { amount: { $gt: 0 }}])
        
        if(!book) {
            return res.status(400).json({
                ok: false,
                msg: 'That book is not avalible'
            });
        }
    
        book.borrowedToUser.push(user.id);
        book.amount -= 1;
        await book.save();
    
        user.borrowedBooks.push(book.id);
        await user.save();
    
        res.status(200).json({
            ok: true,
            msg: `Borrowed book ${book.name} to ${user.email}`
        });        
    } catch (err) {
        sendServerError(err, res);
    }
}

const returnBook = async(req, res) => {
    try {
        const {id} = req.params;
        const user = req.user;
        
        const book = await Book.findById(id);   

        const doHaveBook = book.borrowedToUser.find( userId => userId === user.id);
        if(!doHaveBook) {
            return res.status(400).json({
                ok: false,
                msg: `That book was not borrowed to ${user.email}`
            });
        }
  
        const indexUser = book.borrowedToUser.find((userId, index) => {
            if(userId === user.id) {
                return index;
            }
        });
        book.borrowedToUser.splice(indexUser, 1);
        book.amount += 1;
        await book.save();
    
        const indexBook = user.borrowedBooks.find((bookId, index) => {
            if(bookId === book.id) {
                return index;
            }
        });
        user.borrowedBooks.splice(indexBook, 1);
        await user.save();
    
        res.status(200).json({
            ok: true,
            msg: `${user.email} returned book ${book.name}`
        });        
    } catch (err) {
        sendServerError(err, res);
    }
}

module.exports = {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    avalibleBooks,
    avalibleBook,
    queriesOfBooks,
    borrowBook,
    returnBook
}