const { User } = require('../models');

const isExistEmail = async(email = '') => {
    const searchEmail = await User.findOne({ email });
    if (searchEmail) throw new Error('This email was registered');
}
const notExistUser = async(id = '') => {
    const searchUser = await User.findById(id);
    if (!searchUser) throw new Error('This user not exist');
}

module.exports = {
    isExistEmail,
    notExistUser
}