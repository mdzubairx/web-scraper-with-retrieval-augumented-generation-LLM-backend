import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: "AIzaSyDE3fgzMMouMXZfUr9I3HtDZr21fH_szXc" });

async function getResponse(content) {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: content,
      config: {
        systemInstruction: "You are a Website summarizer Ai, You will get the whole website text and you have to summarize what the website is about in a paragraph. Please note that the text words in the starting can be of the navigation bars so please ignore that. And Also the words at the ending can be of footer section of website, So please ignore that also",
      },
    });
    // console.log(response.text);
    return response.text;
  }
  
  export default getResponse;