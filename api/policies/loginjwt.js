

const jwt = require('jsonwebtoken')
module.exports = (req,res,next) => {
    try{
        const token = req.cookies.token
        if(!token){
            return res.redirect('/login')
        }
        else
        {
            const decoded = jwt.verify(token, 'secret')
            console.log(decoded);
        }
    }
    catch(error){
        return res.redirect('/login')
    }
}