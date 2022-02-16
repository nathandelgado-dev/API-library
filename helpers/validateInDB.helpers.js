const { User, Book, Category } = require('../models');

const isExistEmail = async(email = '') => {
    const searchEmail = await User.findOne({ email });
    if (searchEmail) throw new Error('This email was registered');
}

const notExistUser = async(id = '') => {
    const searchUser = await User.findById(id);
    if (!searchUser) throw new Error('This user not exist');
}

const isExistBookName = async(name, res) => {
    const isExistBook = await Book.findOne({ name: name.toUpperCase()});
    if(isExistBook){
        return res.status(400).json({
            ok: false,
            msg: 'These book was already created'
        });
    }
}

const isExistBookId = async(id) => {
    const searchBook = await Book.findById(id);
    if (!searchBook) throw new Error('These id book not exist');
}

const isExistCategory = async(category) => {
    const searchCategory= await Category.findOne({ _id: category });
    if (searchCategory) throw new Error('This category was registered');
}

const notExistCategory = async(category) => {
    const searchCategory= await Category.findOne({ _id: category });
    if (!searchCategory) throw new Error('This category not exist');
}

module.exports = {
    isExistEmail,
    notExistUser,
    isExistBookName,
    isExistBookId,
    isExistCategory,
    notExistCategory
}