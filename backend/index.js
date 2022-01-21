const express = require("express")
const cors = require("cors")
const Register = require("./models/registers")
const e = require("express")
require("./db/conn")
require("./models/registers")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const port = process.env.PORT || 8000


// Routing
app.post("/register", (req, res) => {
    const {name, email, password} = req.body
    Register.findOne({email: email}, (err, user) => {
        if(user) {
            res.send({message: "User already exists"})
        } else {
            const user = new Register({
                name: name,
                email: email,
                password: password
            })
            user.save((err) => {
                if(err) {
                    res.send(err)
                } else {
                    res.send({message: "Successfully registered!!! Please login now."})
                }
            })
        }
    })
    
})

app.post("/login", (req, res) => {
    const {email, password} = req.body
    Register.findOne({email: email}, (err, user) => {
        if(user){
            if(password === user.password){
                res.send({message: "Login Successful", user: user})
            } else{
                res.send({message: "Password didn't match"})
            }
        } else{
            res.send({message: "User is not registered"})
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})