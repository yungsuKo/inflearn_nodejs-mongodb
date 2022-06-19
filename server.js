const express =require('express');
const app = express();
const mongoose = require('mongoose');

const users = [];
const MONGO_URI = 'mongodb+srv://yungsu2391:PJrJXMvR9ZZVwEQV@mongodbtutorial.rtc9n.mongodb.net/BlogService?retryWrites=true&w=majority';

const server = async() => {

    try{
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB conneted')
        app.use(express.json())

        app.get('/user', function(req, res){
            return res.send({users : users})
        })

        app.post('/user', function(req,res){
            users.push({name :req.body.name, age :req.body.age});
            return res.send({sucess : true});
        })

        app.listen(3000, function(){
            console.log('server listening on port 3000');
        });
    }catch(err){
        console.log(err)
    }

    
}

server();

