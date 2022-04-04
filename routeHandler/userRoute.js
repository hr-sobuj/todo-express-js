const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model('User', userSchema);

// ROUTE OBJECT
const route = express.Router();


// SINGUP
route.post('/signup', async (req, res) => {
    try {
        const hashPassWord = await bcrypt.hash(req.body.password, 10);
        const UserName = req.body.username.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
        const newUser = new User({
            name: req.body.name,
            username: UserName,
            password: hashPassWord
        });
        await newUser.save();
        res.status(200).json({
            message: "User Created Successfully!"
        })
    } catch (error) {
        res.status(400).json({
            error: "User Creation failed!" + error.message
        })
    }

})

route.post('/signin', async (req, res) => {
    try {
        // FIND USER FROM DATABASE
        const user = await User.find({ username: req.body.username });

        if (user && user.length > 0) {
            // USER VALIDATION 
            const isValidUser = await bcrypt.compare(req.body.password, user[0].password);
            
            if (isValidUser) {
                // GENERATE JWT TOKEN
                const token = await jwt.sign({
                    name: user[0].name,
                    id: user[0]._id
                }, process.env.JWT_KEY, {
                    expiresIn: '1h'
                })
                res.status(200).json({
                    "access_token": token,
                    "message": "Login Successfull."
                })
            } else {
                res.status(401).json({
                    error: "Authentication Failed!3"
                })
            }
        } else {
            res.status(401).json({
                error: "Authentication Failed!2"
            })
        }
    } catch (error) {
        res.status(401).json({
            error: "Authentication Failed!1"+error.message
        })
    }
})


module.exports = route;