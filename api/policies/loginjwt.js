

const jwt = require('jsonwebtoken')
module.exports = (req,res,proceed) => {
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(500).json({
                statuscode : 500,
                message : 'Generate the token'
            })
        }
        else
        {
            const decoded = jwt.verify(token, 'secret')
            console.log(decoded);
            proceed()
        }
    }
    catch(error){
        return res.status(500).json({
            message : 'error'
        })
    }
}