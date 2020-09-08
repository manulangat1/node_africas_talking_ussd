const mongoose = require('mongoose')
const User = require('../models/User')


exports.postUser = async(req,res) => {
    const { username,tel,password} = req.body 
    const newUser =new  User(req.body)
    await newUser.save()
    res.status(201).json({
        success:true,
        data:newUser
    })
}
exports.getUser = async (req,res) => {
    const users = await User.find()
    res.status(200).json({
        success:true,
        data:users
    })
}