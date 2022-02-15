const sendServerError = (err) => {
    console.error(err);
    res.status(500).json({
    ok: false,
    msg: 'Contact to the administrator'
    });
}

module.exports = {
    sendServerError    
}