const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const monk = require('monk');
const rateLimit = require("express-rate-limit");

const db = monk("localhost/tweet");
const tweet = db.get('posts')

app.use(cors());
app.use(express.json());

app.get('/', (req,res) =>{
    res.send('<h1> gekki desiyo </h1>')
})


function validation(post){
    return post.name && post.name.toString().trim() !=='' &&
            post.content && post.content.toString().trim !== ''
}

const limiter = rateLimit({
    windowMs: 30 * 1000, // 15 minutes
    max: 3 // limit each IP to 100 requests per windowMs
  });
   
  //  apply to all requests
  app.use(limiter);


app.post('/posts', (req,res) => {
    if(validation(req.body)){
        const post = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        }
        tweet.insert(post)
            .then(createdPost => {
                res.json(createdPost)
            })
    }else{
        res.status(422)
        res.json({
            message: 'Fill it up'
        })
    }
})




app.get('/posts', (req,res) => {
tweet.find().then(tweet => res.json(tweet))
})
app.listen(port, () => {
    console.log('its running on port '+ port); 
})