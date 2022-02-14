const { response, request } = require('express');

const usersGet = (req = request, res = response) => {
    const { id, name = 'Not name', age } = req.query;

    res.json({
        msg: 'get - Controller',
        id,
        name,
        age
    });
}

const usersPost = (req, res) => {
    const { name, age } = req.body;

    res.json({
        msg: 'post - controller',
        name,
        age
    });
}

const usersPut = (req, res) => {
    const { id } = req.params;

    res.json({
        msg: 'put - Controller',
        id
    });
}

const usersPatch = (req, res) => {
    res.json({
        msg: 'patch - Controller'
    });
}

const usersDelete = (req, res) => {
    res.json({
        msg: 'delete - Controller'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete

}