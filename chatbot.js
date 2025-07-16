import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDE3fgzMMouMXZfUr9I3HtDZr21fH_szXc" });

async function ChatBotgetResult(query, retrievedtext) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: query,
    config: {
      systemInstruction: `Use the following context to answer the user's question and also provide some explanation too accordingly. Context: ${retrievedtext} `,
    },
  });
//   console.log(response.text);
  return response.text;
}

export default ChatBotgetResult;