import asyncHandler from 'express-async-handler'
import generateToken from '../utilis/generateToken.js'
import User from '../models/userModel.js'


// @desc Auth user & get token
// @desc POST/ api/users/login
// @acess public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid eamil or password')
    }
})

// @desc Register a new user
// @desc POST/ api/users
// @acess public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc GEt user profile
// @desc GET/ api/users/profile
// @acess private

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else { 
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc update user profile
// @desc PUT/ api/users/profile
// @acess private

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else { 
        res.status(404)
        throw new Error('User not found')
    }
})

export {authUser,registerUser, getUserProfile, updateUserProfile}