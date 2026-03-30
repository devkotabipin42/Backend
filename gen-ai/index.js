import 'dotenv/config'
import readline from "readline/promises"
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool, createAgent } from "langchain";
import{sendEmail} from './mail.services.js'
import { searchInternet } from './search.services.js';
import * as z from 'zod'

const emailTool = tool(
    sendEmail ,
    {
        name:'emailTool',
        description:'use this tool to send email ',
        schema:z.object({
            to:z.string().describe("The recipient email address"),
            html:z.string().describe('The HTML content of the email'),
            subject:z.string().describe('the subject of the email')
        })

    }
)

const searchTool = tool(
    async ({ query }) => await searchInternet(query),
    {
        name: 'searchInternet',
        description: 'Search the internet for current, real-time information. Use this when user asks about news, recent events, or anything that needs up-to-date data.',
       schema:z.object({
            to:z.string().describe("The recipient email address"),
            html:z.string().describe('The HTML content of the email'),
            subject:z.string().describe('the subject of the email')
        })
     }
)
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const model = new ChatMistralAI({
    model:'mistral-small-latest',
})
 
const agent = createAgent({
    model,
    tools:[emailTool,searchTool]
})

const messages =[]
while(true){
    const userInput = await rl.question("\x1b[32mYou:\x1b[0m " )

    messages.push(new HumanMessage(userInput))
    const response = await agent.invoke({messages})
    messages.push(response.messages[ response.messages.length - 1 ])
    console.log(response);
    // console.log(`\x1b[32mYou:\x1b[0m ${response.content}` );
    
}
 