import 'dotenv/config'
import readline from "readline"
import { ChatMistralAI } from "@langchain/mistralai";
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const model = new ChatMistralAI({
    model:'mistral-small-latest'
})

const response = await module.invoke('what is the biggest animal on the world')

console.log(response.text);
