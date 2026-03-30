import {PDFParse} from 'pdf-parse';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import {MistralAIEmbeddings} from "@langchain/mistralai"
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';

let dataBuffer = fs.readFileSync('./STORY.pdf');

const parser = new  PDFParse({
    data: dataBuffer
});

const data = await parser.getText()
console.log(data);

const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRALAI_API_KEY,
    model:"mistral-embed"
})

const splitter = new RecursiveCharacterTextSplitter({
     chunkSize: 400,
     chunkOverlap: 0
     })
const chunks = await splitter.splitText(data.text)

const docs = await Promise.all(chunks.map(async(chunk)=>{
    const embedding = await embeddings.embedQuery(chunk)
    return {
        text: chunk,
        embedding: embedding
    }
}))
console.log(docs)