const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../db/config.db');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.path = {
            books: '/api/books',
            categories: '/api/categories',
            notFound: '*',
            users: '/api/users'
        };
        this.middlewares();
        this.routes();
        this.conectDB();
    }

    middlewares() {
        //Cors
        this.app.use(cors());

        //Read and parse of body
        this.app.use(express.json());

        //Public patch
        // this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.path.users, require('../routes/users.routes'));
        this.app.use(this.path.books, require('../routes/books.routes'));
        this.app.use(this.path.categories, require('../routes/categories.routes'));
        this.app.use(this.path.notFound, require('../routes/notFound.routes'));
    }

    async conectDB() {
        await dbConnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Runing in port: ${this.port}`);
        })
    }
}

module.exports = Server;