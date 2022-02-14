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
    const { __v, pass, _id, updatedAt, createdAt, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

module.exports = model('User', UserSchema);