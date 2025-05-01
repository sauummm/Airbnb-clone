const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asdflkjhg';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],}));

    console.log(process.env.MONGO_URL);


 mongoose.connect(process.env.MONGO_URL);


app.get('/test', (_req,res)=>{
    res.json('test OK');
});

app.post('/register', async (req,res)=>{
    const{name, email,password} = req.body;
    try{
    const userDoc = await User.create({
        name, 
        email, 
        password: bcrypt.hashSync(password, bcryptSalt), 
    });


    res.json(userDoc);
}catch(e){
    console.log(e);
    res.status(422).json(e);
}
});

app.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        const passOK = bcrypt.compareSync(password, userDoc.password);
        if(passOK){
            jwt.sign({
                email: userDoc.email,
                 id:userDoc._id,
                 name: userDoc.name},
                 jwtSecret, {}, (err, token)=> {
                if(err) throw err;
                res.cookie('token', token).json(userDoc);
            } );
        }else{
            res.status(422).json('wrong password');
        }

    }else{
        res.json('not found');
    }
})

app.get('/profile', (req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, (err, user)=>{
            if(err) throw err;
            res.json(user);


        });

    }else{
        res.json('no token');
    }
    res.json({token});
})
console.log('Server is running on port 4000');
app.listen(4000);
// B6HhBha7m4aJPGIr
// 116.73.231.74

// mongodb+srv://booking:B6HhBha7m4aJPGIr@mycluster.7sc0sfh.mongodb.net/?retryWrites=true&w=majority&appName=myCluster