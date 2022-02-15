const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const {User} = require('../models');
const {
    createJWT,
    sendServerError,
    encryptPass
} = require('../helpers')

const getAllUsers = async(req, res) => {
    try {
        const activeUsers = await User.find({ status: true });
    
        res.status(200).json({
            ok: true,
            users: activeUsers
        });        
    } catch (err) {
        sendServerError(err);
    }
}

const getUser = async(req, res) => {
    try {
        const {id} = req.params;
    
        const user = await User.findById(id);
    
        res.status(200).json({
            ok: true,
            user
        });        
    } catch (err) {
        sendServerError(err);
    }
}

const userSignup = async(req, res) => {
    try {
        const { email, pass } = req.body;
    
        const newUser = new User({
            email,
            pass
        });
    
        //Crypt the pass
        newUser.pass = encryptPass(pass)

        await newUser.save();
        res.status(200)
            .json({
                ok: true,
                msg: 'User saved'
            });

    } catch (err) {
        sendServerError(err);
    }
}

const userSignin = async(req, res) => {
    try {
        const { email, pass } = req.body;

        //is exist user and is active 
        const user = await User.findOne({ email });
        if (!user || !user.status) {
            return res.status(400).json({
                ok: false,
                msg: "The email or passsword is wrong"
            });
        }

        //Verify pass
        const validPass = bcryptjs.compareSync(pass, user.pass);
        if (!validPass) {
            return res.status(400).json({
                ok: false,
                msg: "The email or passsword is wrong"
            });
        }

        //Create JWT
        const token = await createJWT(user.id);

        res.status(200).json({
            ok: true,
            token      
        });
    } catch (error) {
        sendServerError(err);
    }
}

const updateUser = async(req, res) => {
    try {
        const {id} = req.params;
        const {email, pass} = req.body;
        
        if(!email && !pass) {
            return res.status(400).json({
                ok: false,
                msg: 'Should exist email or pass in the request body'
            });
        }

        const user = await User.findById(id);

        const updateUser = {
            email: email || user.email,
            pass: pass || user.pass,
            updatedAt: new Date()
        }
        
        //Crypt the pass
        if(pass){
            updateUser.pass = encryptPass(pass);
        }

        await User.findByIdAndUpdate({ _id: user.id }, updateUser);

        res.status(200).json({
            ok: true,
            msg: 'User updated'
        });        
    } catch (err) {
        sendServerError(err);
    }
}

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params;
    
        await User.findByIdAndUpdate({ _id: id }, { status: false });
    
        res.status(200).json({
            ok: true,
            msg: 'User deleted'
        });        
    } catch (err) {
        sendServerError(err);
    }
}

module.exports = {
    getAllUsers,
    getUser,
    userSignup,
    userSignin,
    updateUser,
    deleteUser
}