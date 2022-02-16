const regexUpperGlobal = (name) => {
    const nameUpperCase = name.toUpperCase();
    return new RegExp(nameUpperCase, 'g');
}

module.exports = {
    regexUpperGlobal
}