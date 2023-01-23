var jwt = require('jsonwebtoken');
const JWT_SECRET = "harshjain"

const fetchuser = (req, res, next) => {
    // get the user from the jwt token and add id to req object
    const token = req.header("auth-token")
    if(!token){
        res.status(401).send({ error: "please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        // console.log(data) //  { user: { id: '63844005f4858c54fa3b68ea' }, iat: 1669733336 }
        req.user = data.user
        // console.log(req.user)  // { id: '63844005f4858c54fa3b68ea' }
        next() // next mean neaxt wala functioin run hoga ,// see in auth.js 
    } catch (error) {
        res.status(401).send({ error: "please authenticate using a valid token" })
    }
}

module.exports = fetchuser

