

/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
      add : function(req,res){
        Test.create({CategoryName: req.body.CategoryName}).exec(function (err, data){
            if(err){
                res.send(500,{error: 'error'})
            }
            res.redirect('/category/show')
        })
      },

      categoryshow : function(req,res){
            Test.find({})
            .exec(function(err, data){
                if (err) {
                    res.send(500, { error: 'Database Error' })
                }
                res.view('listcategory', { data: data })
            })
      },

      delete: function (req, res) {
        Test.destroy({ id: req.params.id }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error' })
            }
            res.redirect('/category/show')
        })
    },

    itemadd : async function(req,res){
        console.log(req.body);
       await item.create({ 
            itemName : req.body.itemName, 
            description: req.body.description, 
            price: req.body.price , 
            displayOrder : req.body.displayOrder,
            image : req.body.image,
            items: req.body.items
        }).fetch().then(function (result){
           // console.log(req.body.items);
            console.log(result);
            console.log('created')
            return res.send(200,{message: 'created'})
        }).catch(err => {
               console.log(err);
                return res.send(500,{error: 'error'})
        })
      },

      itemshow : async function(req,res){
        await Test.find({}).populate('categoryID')
         .then(data => {
            // console.log(data.pop().categoryID);
            res.view('listitem', { data: data })
            const sta = data.pop();
            const dst = data;
            console.log("Dessert Item is +++ > ","Total Item is",sta );
            console.log("Starters item is +++ > ", dst.pop().categoryID);
           
         })
         .catch(err => {
            console.log(err);
         })
      },

      loginadd : function(req,res){
         let username = req.body.username
         let password = req.body.password
        user.create({
            username : username,
            password : password
        }).then(function (result){
            console.log(result)
            return  res.send(200,{message: 'created'})
        })
      },

      edit: function (req, res) {
        Test.findOne({ id: req.params.id }).exec(function (err, test) {
            if (err) {
                res.send(500, { error: 'Database Error' })
            }
            res.view('editCategory', { test: test })
        })
    },

    update: function (req, res) {
        let CategoryName = req.body.CategoryName
        Test.update({ id: req.params.id }, { CategoryName: CategoryName }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error' })
            }
            res.redirect('/category/show')
        })
    },
    search : async function(req,res){
           await Test.find({CategoryName : req.body.CategoryName})
           .then(result => {
               console.log(result);
               res.send(200 , { message : 'getting the result'})
           })
           .catch(err => {
              res.send(500, {error : "Not found in the database"})
           })
    },
      login :async function(req,res){
         await user.find({}).then(data => {
             let username = req.body.username
             let password = req.body.password
             if(data.username === username && data.password === password)
             {
                return res.send(200, {message : 'Authentication is success'})
             }
             else
             {
                return res.send(500 , {message: 'invalid username and password'})
             }
          })
      }
};

