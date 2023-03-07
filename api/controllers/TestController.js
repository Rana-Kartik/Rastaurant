

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
        Test.create({ CategoryName: req.body.CategoryName }).exec(function (err, data) {
            if (err) {
                res.send(500, { error: 'error' })
            }
            res.send(200).json({
                message: 'created'
            })
        })
    },

    //category show in the views
    categoryshow: function (req, res) {
        Test.find({})
            .exec(function (err, data) {
                if (err) {
                    res.send(500, { error: 'Database Error' })
                }
                res.send(200).json({
                    message: 'success'
                })
            })
    },

    //delete the category from the database
    delete: function (req, res) {
        item.destroy({ id: req.params.id }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error' })
            }
            res.send(200).json({
                message: 'deleted'
            })
        })
    },

    //item add in the database through category
    itemadd: async function (req, res) {
        console.log(req.body);
        await item.create({
            itemName: req.body.itemName,
            description: req.body.description,
            price: req.body.price,
            displayOrder: req.body.displayOrder,
            items: req.body.items
        }).fetch().then(function (result) {
            // console.log(req.body.items);
            console.log(result);
            console.log('created')
            return res.send(200, { message: 'created' })
        }).catch(err => {
            console.log(err);
            return res.send(500, { error: 'error' })
        })
    },

    // item shows in the views
    itemshows: async function (req, res) {
        await item.find({})
            .then(data => {
                // console.log(data.pop().categoryID);
                res.send(200).json({
                    message: 'item shows'
                })
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    },

    //item shows in the views based on the category 
    itemshow: async function (req, res) {
        await Test.find({}).populate('categoryID')
            .then(data => {
                // console.log(data.pop().categoryID);
                const sta = data.pop();
                const dst = data;
                console.log("Dessert Item is +++ > ", "Total Item is", sta);
                console.log("Starters item is +++ > ", dst.pop().categoryID);
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
                            .then(result => {
                                console.log(result)
                                return res.send(200, { message: 'created' })
                            })
                        }
                    })
                }
            })
    },

    //edit the item 
    edit: function (req, res) {
        item.findOne({ id: req.params.id }).exec(function (err, test) {
            if (err) {
                res.send(500, { error: 'Database Error' })
            }
            res.send(200)
        })
    },

    //after edit the item also update in the database
    update: function (req, res) {
        item.update({ id: req.params.id }, {
            itemName: req.body.itemName,
            description: req.body.description,
            price: req.body.price,
            displayOrder: req.body.displayOrder,
        }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error' })
            }
            res.status(200).json({
                message: 'updated'
            })
        })
    },

    //searching operation perform in the category side
    search: async function (req, res) {
        let result = await Test.findOne({ CategoryName: req.body.CategoryName })
        if (!result) {
            res.send(500, { error: "not found" })
        }
        else {
            res.status(200).json({
                message: 'searching'
            })
        }
    },

    //get the login credentials and varify from the database
    login: async function (req, res) {
        console.log(req.body);
        await user.findOne({ username: req.body.username })
            .then(async user => {
                console.log("uuu",user);
                if (user.length < 1) {
                    console.log("len<1");
                    return res.status(200).json({
                        message: 'Auth Failed'
                    })
            
                } 
                console.log("==============================");
                const pass= req.body.password;
                console.log("ghhuhj",req.body.password, user.password);
                await bcrypt.compare(pass, user.password, (err, result) => {
                    if (err) {
                        console.log("errr");
                        return res.status(500).json({
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
                        return res.status(200).json({
                            message: 'Auth Success',
                            token: token
                        })
                    }
                    else {
                        console.log("else");
                        return res.status(500).json({
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
    }
};

