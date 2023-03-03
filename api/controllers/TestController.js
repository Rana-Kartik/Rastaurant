

/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    //adding category in the database
    add: function (req, res) {
        Test.create({ CategoryName: req.body.CategoryName }).exec(function (err, data) {
            if (err) {
                res.send(500, { error: 'error' })
            }
            res.redirect('/category/show')
        })
    },

    //category show in the views
    categoryshow: function (req, res) {
        Test.find({})
            .exec(function (err, data) {
                if (err) {
                    res.send(500, { error: 'Database Error' })
                }
                res.view('listcategory', { data: data })
            })
    },

    //delete the category from the database
    delete: function (req, res) {
        item.destroy({ id: req.params.id }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error' })
            }
            res.redirect('/item/shows')
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
                res.view('listitem', { data: data })
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
                res.view('listitem', { data: data })
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
        let username = req.body.username
        let password = req.body.password
        user.create({
            username: username,
            password: password
        }).then(function (result) {
            console.log(result)
            return res.send(200, { message: 'created' })
        })
    },
 
    //edit the item 
    edit: function (req, res) {
        item.findOne({ id: req.params.id }).exec(function (err, test) {
            if (err) {
                res.send(500, { error: 'Database Error' })
            }
            res.view('itemedit', { test: test })
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
            res.redirect('/item/shows')
        })
    },

    //searching operation perform in the category side
    search: async function (req, res) {
        let result = await Test.findOne({ CategoryName: req.body.CategoryName })
        if (!result) {
            res.send(500, { error: "not found" })
        }
        else {
            res.redirect('/category/show')
        }
    },

    //get the login credentials and varify from the database
    login: async function (req, res) {
        let result = await user.findOne({ username: req.body.username, password: req.body.password })
        if (!result) {
            res.send(500, { error: "invalid username and password" })
        }
        else {
            res.redirect('/index')
        }
    }
};

