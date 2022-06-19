const express =require('express');
const res = require('express/lib/response');
const app = express();

const users = [{name:"yongsi", age : 25}];

app.get('/user', function(req, res){
    return res.send({users : users})
})

app.post('/user_create', function(req,res){
    users.push({name : 'ting', age : 60});
    return res.send({sucess : true});
})

app.listen(3000, function(){
    console.log('server listening on port 3000');
});