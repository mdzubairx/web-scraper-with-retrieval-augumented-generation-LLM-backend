import uniqid from "uniqid";
import dotenv from 'dotenv'
dotenv.config();
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from '@pinecone-database/pinecone'
// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });


async function EmbeddandStoreData(text){

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

const docs = await splitter.createDocuments([text]);

let record = [];

docs.forEach((element)=>{
  record.push({_id : uniqid('rec'), chunk_text: element.pageContent});
});


// Target the index
// const index = pc.index("dense-index").namespace("My-First-NameSpace-For-RAG");

// use this to select the namespace
const namespace = pc.index("dense-index", process.env.PINECONE_URL).namespace(process.env.PINECONE_NAMESPACE);

// Upsert the records into a namespace
await namespace.upsertRecords(record);

}

export default EmbeddandStoreData;