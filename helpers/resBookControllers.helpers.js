const notFoundBooks = (books, res) => {
    if(!books || books.length === 0) {
        return res.status(400).json({
            ok: true,
            msg: 'There are no books for that search'
        });          
    }
}

const foundBooks = (books, res) => {
    return res.status(200).json({
        ok: true,
        amount: books.length,
        books
    });
}

module.exports = {
    notFoundBooks,
    foundBooks    
}
