const { response, request } = require('express');

const notFoundGet = (req, res) => {
    res.status(404)
        .json({
            ok: false,
            msg: 'This endpoint is not implemented or not exist'
        });
}

const notFoundPost = (req, res) => {
    res.status(404)
        .json({
            ok: false,
            msg: 'This endpoint is not implemented or not exist'
        });
}

const notFoundPut = (req, res) => {
    res.status(404)
        .json({
            ok: false,
            msg: 'This endpoint is not implemented or not exist'
        });
}

const notFoundPatch = (req, res) => {
    res.status(404)
        .json({
            ok: false,
            msg: 'This endpoint is not implemented or not exist'
        });
}

const notFoundDelete = (req, res) => {
    res.status(404)
        .json({
            ok: false,
            msg: 'This endpoint is not implemented or not exist'
        });
}

module.exports = {
    notFoundGet,
    notFoundPost,
    notFoundPut,
    notFoundPatch,
    notFoundDelete
}