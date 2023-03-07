
const jwt = require('jsonwebtoken')
module.exports = function(req,res,next){
    res.send(200).json({
        message : 'welcome'
    })
}