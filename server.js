const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const routes =  require('./src/routes');

const app = express();


const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/equipamentos',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false
},function (err){
    if(err){
        console.log(err)
    }else{
        console.log('MongoDB up and running!')
    }
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routes);
app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


app.listen(port, function(){
    console.log(`Server runing on port ${port}`)
});