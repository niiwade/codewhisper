import express from "express";
import * as dotenv from "dotenv";
import cors from "cors"
import { Configuration,OpenAIApi } from "openai";

dotenv.config();


// create new configuration

const configuration = new Configuration({
    apiKey: process.env.OpenAI_API_KEY,
})


// pass api to configuration

const openai = new OpenAIApi(configuration);


const app = express();


//Middlewares

app.use(cors());
app.use(express.json())


app.get('/', async(req,res)=>{
    res.status(200).send({
        message: "Hello from WisCode"
    })
})


app.post('/', async(req,res)=>{
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model:"text-davinci-003",
            prompt:"${prompt                                    }",
            temperature:0,
            max_tokens:4000,
            top_p:1,
            frequency_penalty:0.5,
            presence_penalty:0
        })

        res.status(200).send({
            code: response.data.choices[0].text
        })
    } catch (error) {

        res.status(500).send({error})
        
    }
})

app.listen(5000,()=>
    console.log("Server is running  on port http://localhost:5000")
)