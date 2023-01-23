const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "harshjain"
var fetchuser = require('../middleware/fetchuser')

// Route 1 : create a user using: POST "api/auth/createuser" dosnt require auth // for validatioin we are express validation npm pakage // No login required
router.post('/createuser',[
    body('name', 'Enter a valid name ').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 charaters').isLength({ min: 5 })
], async (req, res)=>{
    let success = false
    const errors = validationResult(req);
    // if they are errors, return bad request and the errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // check weather the email with this same email exits already 
    try {
    let user = await User.findOne({ email: req.body.email }) 
    if(user){
        return res.status(400).json({ success ,error: "sorry a user with this email alredy exists" })
    }

    const salt = await bcrypt.genSalt(10)  
    const secPass = await bcrypt.hash(req.body.password, salt)
    // Create a new user
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email 
      })     

      
      const data = {
        user:{
            id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET)
      success = true
   res.json({success, authToken})

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Enternals Server Error")
    }
})

// Route 2 : authonticate a user using: POST "api/auth/login" dosnt require auth // No login required
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password can not be blank').exists()
], async (req, res)=>{
    const errors = validationResult(req);
    let success = false
    // if they are errors, return bad request and the errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({email})
        if(!user){
            success = false
            return res.status(400).json({success, error: "please try login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            success = false
            return res.status(400).json({ success, error: "please try login with correct credentials" })
        }

        const data = {
            user:{
                id: user.id
            }
          }
          const authToken = jwt.sign(data, JWT_SECRET)
          success = true
       res.json({ success, authToken})

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Enternals Server Error")
    }
})


// Route 3 : Get loggedin User details using: POST "api/auth/getuser" login required
router.post('/getuser', fetchuser, async (req, res)=>{ // fetchuser is middleware function for fetching the data of the user
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Enternals Server Error")
    }
})



module.exports = router

