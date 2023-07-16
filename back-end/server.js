const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())

app.post('/completions', async (req, res) => {
    const options ={
        method : 'POST',
        headers : {
            'Authorization': `Bearer ${process.env.CHAT_GPT_API_KEY}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[
                {
                    role: "user", 
                    content: req.body.message
                }
            ],
            max_tokens :100,
        })
    }
    try{
        const responce = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await responce.json();
        res.send(data);
    }catch(error){
        res.status(400).json({
             success : false,
             message : error
         });
    }
});

app.listen(4000, () => console.log('server is up....'))