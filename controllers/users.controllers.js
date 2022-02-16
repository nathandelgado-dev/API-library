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
        const activeUsers = await User.find({ status: true })
            .populate({ path: 'borrowedBooks', select: 'name'});
    
        res.status(200).json({
            ok: true,
            amount: activeUsers.length,
            users: activeUsers
        });        
    } catch (err) {
        sendServerError(err, res);
    }
}

const getUser = async(req, res) => {
    try {
        const {id} = req.params;
    
        const user = await User.findById(id)
            .populate({ path: 'borrowedBooks', select: 'name'});

        if(!user) {
            res.status(400).json({
                ok: false,
                msg: 'The user not exist'
            });  
        }
            
        res.status(200).json({
            ok: true,
            user
        });        
    } catch (err) {
        sendServerError(err, res);
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
        res.status(201)
            .json({
                ok: true,
                msg: 'User created'
            });

    } catch (err) {
        sendServerError(err, res);
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
        sendServerError(err, res);
    }
}

const updateUser = async(req, res) => {
    try {
        const {id} = req.params;
        const {email, pass} = req.body;
        const userByJWT = req.user;

        if(userByJWT.id !== id){
            return res.status(401).json({
                ok: false,
                msg: 'Only you can modify your own account'
            });
        }
        
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

        res.status(201).json({
            ok: true,
            msg: 'User updated'
        });        
    } catch (err) {
        sendServerError(err, res);
    }
}

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params;
        const user = req.user;

        if(user.id !== id) {
            return res.status(401).json({
                ok: false,
                msg: 'Only you can delete your own account'
            });
        } 
    
        await User.findByIdAndUpdate({ _id: id }, { status: false });
    
        res.status(200).json({
            ok: true,
            msg: 'User deleted'
        });        
    } catch (err) {
        sendServerError(err, res);
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