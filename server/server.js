const {Configuration, OpenAIApi} = require("openai")
const express = require('express')
const path = require('path')

const app = express()

const indexHtml = path.resolve(__dirname, '..', 'client', 'dist')



const askChatGPT = async function(yourAsk) {
    const configuration = new Configuration({
        apiKey: process.env.OPEN_AI_API
    })
    
    const openai = new OpenAIApi(configuration)

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: 'user', content: yourAsk}]
    })
    /*const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: yourAsk,
        max_tokens: 250,
        temperature: 0.3
    })*/

    return response.data.choices[0]
}

app.use(express.static(indexHtml))

app.use(express.json({extended: true, limit: '1mb'}))

app.post('/getResponse', async (req,res) => {
    const data = req.body 
    const translation = await askChatGPT(data.question)
    console.log(data.question)
    console.log(translation)
    res.header({
        'Content-Type': 'application/json'
    })
    res.send(JSON.stringify({...translation}))
})

app.listen(8080,'localhost', () => {
    console.log("Running at http://localhost:8080/")
})