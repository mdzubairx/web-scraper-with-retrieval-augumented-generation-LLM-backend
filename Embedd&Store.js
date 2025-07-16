import uniqid from "uniqid";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from '@pinecone-database/pinecone'
// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: 'pcsk_2b7LVW_CdVk8jDXtZbrUCdoybfdj7YcqMfuLEVh3LGt52hxMpVx6svHTt4ZTZDDv3BXJ5H' });


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
const namespace = pc.index("dense-index", "https://dense-index-z336jvv.svc.aped-4627-b74a.pinecone.io").namespace("My-First-NameSpace-For-RAG");

// Upsert the records into a namespace
await namespace.upsertRecords(record);

}

export default EmbeddandStoreData;