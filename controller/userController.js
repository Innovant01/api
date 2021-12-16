const Users = require('../model/userModel')
const bcrypt = require('bcrypt')

const userCtrl = {
    register: async (req, res) => {
        try {
            const {firstName,lastName ,email, password} = req.body
            
            if(!firstName || !lastName || !email || !password)
                return res.status(400).json({msg: "Please fill in all fields."})

            if(!validateEmail(email))
                return res.status(400).json({msg: "Invalid emails."})

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "This email already exists."})

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new Users({
                firstName , lastName, email, password: passwordHash  
              })
     
             await newUser.save()
                
            res.json({msg: "Register Success! "})

        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req,res)=>{
        try{
            const{email,password}=req.body
            const user = await Users.findOne({email})
            if(!user)  return res.status(500).json({msg : "this mail does not exist"})
            const IsMatch = await bcrypt.compare(password, user.password)
            if(!IsMatch) return res.status(400).json({msg:'Password is incorrect'})
            res.json({msg: "Login success!"})
        }catch(err){
            return res.status(500).json({msg : err.message})
        }
    },
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = userCtrl