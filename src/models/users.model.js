const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema({
    username:String,
    email:String,
    user_lvl:{type:Number, default:1},
    password:String,
},{
    timestamps:true
});

DataSchema.pre('save',function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = bcrypt.hashSync(this.password,10);
    next();
});

DataSchema.pre('findOneAndUpdate', function (next){
    var upPassword = this.getUpdate().password+'';
    if(upPassword.length<55){
        this.getUpdate().password = bcrypt.hashSync(upPassword,10);
    }
    next();
});

DataSchema.methods.isCorrectPassword = function (upPassword, callback ){
    bcrypt.compare(upPassword,this.password,function(err,same){
        if(err){
            callback(err);
        }else{
            callback(err, same);
        }
    })
}

const users = mongoose.model('users',DataSchema);
module.exports = users;