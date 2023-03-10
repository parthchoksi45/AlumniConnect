const express= require('express');
const connectDB= require('./config/db');
const path=require('path');
const app=express();

//Connect Database
connectDB();

//init Middleware
app.use(express.json({extended: false}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

const PORT = process.env.PORT||5000;

//Define routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));

if(process.env.NODE_ENV==='production'){

    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{

        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
