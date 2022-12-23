import { Express } from "express";
import * as dotenv from "dotenv";
import cors from "cors"
import { Configuration,OpenAIApi } from "openai";

dotenv.config();


// create new configuration

const configuration = new Configuration({
    apiKey: process.env.OpenAI_API_KEY
})


// pass api to configuration

const openai = new OpenAIApi(configuration);


const app = express();


//Middlewares

app.use(cors());
app.use(express.json())


app.get('/', async(req,res)=>{
    res.status(200).send({
        messag: "Hello from WisCode"
    })
})