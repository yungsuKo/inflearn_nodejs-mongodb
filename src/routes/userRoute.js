const {Router} = require('express');
const userRouter = Router();
const {User} = require('../models/User');
const mongoose = require('mongoose');

userRouter.get('/', async(req, res) => {
    try{
        const users = await User.find({});
        return res.send({ users})    
    }catch(err){
        console.log(err);
    }
    
})

userRouter.get('/:userId', async(req ,res) => {
    try{
        const {userId} = req.params;
        if(!mongoose.isValidObjectId(userId)) return res.status(400).send({err : "invalid userId"});
        const user = await User.findOne({_id : userId});
        return res.send(user)
    }catch(err){
        return res.status(500).send({err: err.message})
    }
})

userRouter.delete('/:userId', async(req, res) => {
    try{
        const {userId} = req.params;
        if(!mongoose.isValidObjectId(userId)) return res.status(400).send({err : "invalid userId"});
        const user = await User.findOneAndDelete({_id : userId});
        
        return res.send(user)
    }catch(err){
        return res.status(500).send({err: err.message})
    }
})

userRouter.put('/:userId', async(req,res) => {
    try{
        const {userId} = req.params;
        if(!mongoose.isValidObjectId(userId)) return res.status(400).send({err : "invalid userId"});
        const {age, name} = req.body;
        if(!age && !name) return res.status(400).send({err : "age or name is not required"})
        if(!age) return res.status(400).send({err : "age is not required"})
        if(name && typeof name.first !== 'string' && typeof name.last !== 'string') return res.status(400).send({err : "name is not required"})

        let updateBody = {};
        if(age) updateBody.age = age;
        if(name) updateBody.name = name;
        

        const user = await User.findByIdAndUpdate(userId, updateBody, {new : true});
        return res.send(user)
        
    }catch(err){
        return res.status(500).send({err: err.message})
    }
})

userRouter.post('/', async (req,res) => {
    try{
        let {username, name} = req.body;
        if(!username) return res.status(400).send({ err:"username is required" });
        if(!name || !name.first || !name.last) return res.status(400).send({ err:"Both first, last name is required" })
        const user = new User(req.body);
        await user.save();
        return res.send({ user });
    }catch(err){
        console.log(err)
        return res.status(500).send({err:err.message});
    }
    
})

module.exports = {
    userRouter
}
