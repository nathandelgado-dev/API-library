const bcryptjs = require('bcryptjs');

const encryptPass = (pass) => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(pass, salt);
}

module.exports = {
    encryptPass
}
