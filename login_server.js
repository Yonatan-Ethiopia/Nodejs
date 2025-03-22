const express= require('express');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const app= express();
const port= 3000;
const users= [ 
    {email: 'my@gmail.com',
     pass: bcrypt.hashSync('pass')
     role: 'admin'
}]
app.use(express.json());
app.post('/login', (req,res)=>{
    const {email , pass}= req.body;
    if(!email || !pass){
        return res.status(400).json({message :'Missing input'});
    }
    const user= users.find(u=> u.email === email);
    if(!user){
        return res.status(404).json({message: 'Missing email'});
    }
    const isMatch= await bcrypt.compare(pass, user.pass);
    if(!isMatch){
        return res.status(401).json({message: 'Mismatch pass'});
    }
    const token= jwt.sign(
        {email: user.email, role: user.role}, 
        process.env.JWT_SECRET,
        {expiresIn,'24h'});
    res.json({message: 'Success', token});
});

    