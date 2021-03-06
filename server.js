require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())


const checkAuth = require('./middleware/checkAuth')
const PORT = process.env.PORT || 5002;


//route imports
const auth = require('./routes/auth')
const user = require('./routes/user')
const public = require('./routes/public')
const blog = require('./routes/blog')
const resources = require('./routes/resources')
//middleware inits
const uri = 'mongodb+srv://watacle:watacle28@wemen-kru3s.mongodb.net/Bloggie?retryWrites=true&w=majority'
app.use('/api/auth',auth);
app.use('/api/user',checkAuth,user);
app.use('/api/public',public);
app.use('/api/blog',checkAuth,blog)
app.use('/api/external', checkAuth,resources)
// app and db connect

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
  }
mongoose.connect(uri,{useCreateIndex: true,useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>{
        console.log('database connected succesfully');
        app.listen(PORT,()=> console.log(`server started at ${PORT} use http://localhost:${PORT} to connect`))
    })