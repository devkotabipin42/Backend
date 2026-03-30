import { tavily } from "@tavily/core";


const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY })

export async function searchInternet(query) {
    const response = await tavilyClient.search(query, { maxResults: 5 })
    return response.results
        .map((r, i) => `${i + 1}. ${r.title}\n${r.content}`)
        .join("\n\n")
}