const {
    Schema,
    model,
} = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
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

CategorySchema.methods.toJSON = function() {
    const { __v, updatedAt, createdAt, ...category } = this.toObject();
    return category;
};

module.exports = model('Categorie', CategorySchema);