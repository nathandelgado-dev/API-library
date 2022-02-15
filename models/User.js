const {
    Schema,
    model
} = require('mongoose');

const UserSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        requiered: true
    },
    borrowedBooks: {
        type: Array,
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

UserSchema.methods.toJSON = function() {
    const { __v, pass, _id, borrowedBooks, updatedAt, status, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

module.exports = model('User', UserSchema);