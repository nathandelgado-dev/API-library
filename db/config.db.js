const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        mongoose.connect(process.env.MONGODB_CNN);

        console.log('Connected Database!');

    } catch (error) {
        console.log(error);
        throw new Error('Error to start Database');
    }
}

module.exports = {
    dbConnection
}