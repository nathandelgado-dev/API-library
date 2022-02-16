const { response, request } = require('express');
const { sendServerError } = require('../helpers');
const { Category } = require('../models');

const getAllCategories = async(req, res) => {
    try {
        const categories = await Category.find({ status: true });
    
        if(categories.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Not exist categories or are inactive'
            });
        }
    
        res.status(200).json({
            ok: true,
            amount: categories.length,
            categories
        });        
    } catch (err) {
        sendServerError(err, res)
    }
}

const getCategory = async(req, res) => {
    try {
        const {id} = req.params;
    
        const category = await Category.findById(id);
    
        res.status(200).json({
            ok: true,
            category
        });        
    } catch (err) {
        sendServerError(err, res);
    }
}

const createCategory = async(req, res) => {
    try {
        const { name } = req.body;
        const nameUpperCase = name.toUpperCase();
    
        const newCategory = new Category({name: nameUpperCase});
    
        await newCategory.save()
    
        res.status(201).json({
            ok: true,
            msg: 'Created category'
        });        
    } catch (err) {
        sendServerError(err, res);
    }
}

const updateCategory = async(req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;
    
        const nameUppercase = name.toUpperCase();
    
        const updateCategory = {
            name: nameUppercase,
            updatedAt: new Date()
        }
    
        await Category.findByIdAndUpdate(id, updateCategory);
    
        res.status(200).json({
            ok: true,
            msg: 'Updated category'
        });        
    } catch (err) {
        sendServerError(err, res);
    }
}

const deleteCategory = async(req, res) => {
    try {
        const {id} = req.params;

        const DeleteCategory = {
            status: false,
            updatedAt: new Date()
        }
    
        await Category.findByIdAndUpdate(id, DeleteCategory);
    
        res.status(200).json({
            ok: true,
            msg: 'Deleted category'
        });        
    } catch (err) {
        sendServerError(err, res);
    }
}

module.exports = {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}