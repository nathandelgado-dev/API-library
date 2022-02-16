const {
    Schema,
    model,
} = require('mongoose');

const BookSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        requiered: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        requiered: true
    },
    amount: {
        type: Number,
        default: 1
    },
    borrowedToUser: {
        type: Schema.Types.Array,
        ref: 'User',
        default: []
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date
    }
});

BookSchema.methods.toJSON = function() {
    const { __v, updatedAt, createdAt, status, ...book } = this.toObject();
    return book;
};

module.exports = model('Book', BookSchema);