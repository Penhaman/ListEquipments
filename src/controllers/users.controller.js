const Users = require('../models/users.model');
const jwt = require("jsonwebtoken");
const { checkout } = require('../routes');
const secret = "mysecret";


module.exports = {
    async index(req,res){
        const listUser = await Users.find();
        res.json(listUser);
    },
    async create(req,res){
        const {username, email, user_lvl, password} = req.body;
        let data = {};
        let userFind =  await Users.findOne({email});
        
        if(!userFind){
            data = {username, email, user_lvl, password};

            user = await Users.create(data);
            return res.status(200).json(userFind);
        }else{
            return res.status(500).json(userFind);
        }
    },
    async details(req,res){
        const {_id} = req.params;
        const detailUser = await Users.findOne({_id});
        res.json(detailUser);
    },
    async delete(req,res){
        const { _id } = req.params;
        const deleteUser = await Users.findByIdAndDelete({_id});
        return res.json(deleteUser);
    },
    async update(req,res){
        const { _id, username, email, user_lvl, password} = req.body;
        const data = {username, email, user_lvl, password};
        const updateUser = await Users.findOneAndUpdate({_id},data,{new:true});
        res.json(updateUser);
    },
    async login(req,res){
        const { email, password } = req.body;
        Users.findOne({email: email}, function(err,user){
            if(err){
                console.log(err);
                res.status(200).json({error: "Server error, try again!"});
            }else if (!user){
                res.status(200).json({status:2, error: 'Email não encontrado!'});
            }else{
                user.isCorrectPassword(password, async function (err, same){
                    if(err){
                        res.status(200).json({error: "Server error, try again!"});
                    }else if(!same){
                        res.status(200).json({status:2, error: "Password incorreta!"});
                    }else{
                        const payload = { email };
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '24h'
                        })
                        res.cookie('token', token, {httpOnly: true});
                        res.status(200).json({status:1, auth:true, token:token,id_user: user._id,username:user.username,user_lvl:user.user_lvl});
                    }
                })
               
            }
        })
    },
    async checkToken(req,res){
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
        if(!token){
            res.json({status:401,msg:'Denied: Token not found!'});
        }else{
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.json({status:401,msg:'Denied: Invalid Token!'});
                }else{
                    res.json({status:200})
                }
            })
        }
    },
    async destroyToken(req,res){
        const token = req.headers.token;
        if(token){
            res.cookie('token',null,{httpOnly:true});
        }else{
            res.status(401).send("Logout error!")
        }
        res.send("Successfully logged out!");
    }
}