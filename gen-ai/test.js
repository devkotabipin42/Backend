import 'dotenv/config'
import { tavily } from "@tavily/core"

const client = tavily({ apiKey: process.env.TAVILY_API_KEY })

const result = await client.search("latest AI news 2025")
console.log(result.results)