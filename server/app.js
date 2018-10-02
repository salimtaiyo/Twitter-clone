const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req,res) =>{
    res.send('<h1> gekki desiyo </h1>')
})


function validation(post){
    return post.name && post.name.toString().trim() !=='' &&
            post.content && post.content.toString().trim !== ''
}

app.post('/posts', (req,res) => {
    if(validation(req.body)){
        const post = {
            name: req.body.name.toString(),
            content: req.body.content.toString()
        }
        console.log(post);
    }else{
        res.status(422)
        res.json({
            message: 'Fill it up'
        })
    }
})
app.listen(port, () => {
    console.log('its running on port '+ port); 
})