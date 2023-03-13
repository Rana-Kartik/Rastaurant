

/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
module.exports = {
    //adding category in the database
    add: function (req, res) {
        Test.create({ CategoryName: req.body.CategoryName })
            .fetch()
            .then(data => {
                res.status(200).json({
                    statusCode: 200,
                    data: data,
                    message: 'created'
                })
            })
            .catch(err => {
                res.status(500).json({
                    statusCode: 500,
                    error: err,
                    message: 'error in creating the item'
                })
            })
    },

    //category show in the views
    categoryshow: function (req, res) {
        Test.find({})
            .then(data => {
                res.status(200).json({
                    statusCode: 200,
                    data: data,
                })
            })
            .catch(err => {
                res.status(500).json({
                    statusCode: 500,
                    error: err,
                    message: 'error in creating the item'
                })
            })
    },

    //delete the category from the database
    categorydelete: function (req, res) {
        Test.destroy({ id: req.params.id }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error' })
            }
            res.status(200).json({
                statusCode: 200,
                message: 'deleted'
            })
        })
    },

    //delete the item in the database
    itemdelete: function (req, res) {
        item.destroy({ id: req.params.id }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error' })
            }
            res.status(200).json({
                statusCode: 200,
                message: 'deleted'
            })
        })
    },

    //item add in the database through category 
    itemadd: async function (req, res) {
        let categoryId = req.params.id;
        console.log(categoryId);
        const { displayOrder } = req.body;
        console.log(displayOrder)
        // checking if displayOrder id already exists in particular category
        let result = await item.find().where({ items: categoryId, displayOrder: displayOrder })
        console.log(result);
        if (result.length > 0) {
            return res.status(400).json({
                status: 400,
                err: 'display Order already existing'
            })
        }
        else {
            await item.create({
                itemName: req.body.itemName,
                description: req.body.description,
                price: req.body.price,
                displayOrder: req.body.displayOrder,
                items: req.body.items
            }).fetch().then(result => {
                res.status(200).json({
                    statusCode: 200,
                    data: result,
                    message: 'item created'
                })
            }).catch(err => {
                res.status(500).json({
                    statusCode: 500,
                    error: err,
                    message: 'error in creating the item'
                })
            })
        }
    },

    // item shows in the views with pagination
    itemshows: async function (req, res) {
        let skip = req.query.skip
        console.log(skip);
        let limit = req.query.limit
        console.log(limit);

        if (skip && limit) {
            let result = await item.find({}).limit(limit).skip(skip * limit)
            res.status(200).json({
                statusCode: 200,
                data: result,
            })
        }
    },

    //item shows in the views based on the category 
    itemshow: async function (req, res) {
        await Test.find({}).populate('items')
            .then(data => {
                console.log(data);
                res.status(200).json({
                    statusCode: 200,
                    data: data,
                })
                // console.log(data.pop().categoryID);
                // const sta = data.pop();
                // const dst = data;
                // console.log("Dessert Item is +++ > ", "Total Item is", sta);
                // console.log("Starters item is +++ > ", dst.pop().categoryID);
            })
            .catch(err => {
                console.log(err);
            })
    },

    //add the login credentials in the database
    loginadd: function (req, res) {
        user.find({ username: req.body.username })
            .then(userdata => {
                if (userdata.length >= 1) {
                    return res.status(200).json({
                        message: 'username exist'
                    })
                }
                else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        }
                        else {
                            user.create({
                                username: req.body.username,
                                password: hash
                            })
                                .fetch()
                                .then(result => {
                                    res.status(200).json({
                                        statusCode: 200,
                                        data: result,
                                        message: 'User Created'
                                    })
                                })
                        }
                    })
                }
            })
    },

    //update the category 
    categoryupdate: function (req, res) {
        Test.update({ id: req.params.id },
            {
                CategoryName: req.body.CategoryName
            })
            .fetch()
            .then(data => {
                res.status(200).json({
                    statusCode: 200,
                    data: data,
                })
            })
    },
    //after edit the item also update in the database
    itemupdate: function (req, res) {
        item.update({ id: req.params.id }, {
            itemName: req.body.itemName,
            description: req.body.description,
            price: req.body.price,
            displayOrder: req.body.displayOrder,
        })
            .fetch()
            .then(data => {
                res.status(200).json({
                    statusCode: 200,
                    message: 'updated',
                    data: data,
                })
            })
            .catch(err => {
                res.status(500).json({
                    statusCode: 500,
                    error: err,
                })
            })
    },


    //searching operation perform in the category side
    search: async function (req, res) {
        await item.find({ itemName: req.body.itemName })
            .then(result => {
                res.status(200).json({
                    statusCode: 200,
                    data: result
                })
            })
    },

    //get the login credentials and varify from the database with jenerate the token
    login: async function (req, res) {
        console.log(req.body);
        await user.findOne({ username: req.body.username })
            .then(async user => {
                console.log("uuu", user);
                if (user.length < 1) {
                    console.log("len<1");
                    return res.status(200).json({
                        statusCode: 500,
                        message: 'Auth Failed'
                    })

                }
                console.log("==============================");
                const pass = req.body.password;
                console.log("ghhuhj", req.body.password, user.password);
                await bcrypt.compare(pass, user.password, (err, result) => {
                    if (err) {
                        console.log("errr");
                        return res.status(500).json({
                            statusCode: 500,
                            message: 'Auth Failed'
                        })
                    }
                    console.log("res", result);
                    if (result) {
                        const token = jwt.sign({
                            username: user.username,
                            userid: user._id
                        }, process.env.JWT_KEY,
                            {
                                expiresIn: "80h"
                            },
                        )
                        console.log(token, "===================");

                        res.cookie('token', token, { httpOnly: true }).send()
                        return res.status(200).json({
                            statusCode: 200,
                            message: 'Auth Success',
                            token: token,
                        })
                    }
                    else {
                        console.log("else");
                        return res.status(500).json({
                            statusCode: 500,
                            message: 'Auth Failed'
                        })
                    }
                })
            })
            .catch(err => {
                return res.status(200).json({
                    error: err
                })
            })
    },

    //perform logout functionality with the help of cookies
    logout: async function (req, res) {
        try {
            res.clearCookie('token')
            res.status(200).json({
                statusCode: 200,
                message: "logout"
            })
        }
        catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }
};

