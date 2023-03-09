

const jwt = require('jsonwebtoken')
module.exports = (req,res,next) => {
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(500).json({
                message : 'not varify the token'
            })
        }
        else
        {
            const decoded = jwt.verify(token, 'secret')
            console.log(decoded);
        }
    }
    catch(error){
        return res.status(500).json({
            message : 'error'
        })
    }
}