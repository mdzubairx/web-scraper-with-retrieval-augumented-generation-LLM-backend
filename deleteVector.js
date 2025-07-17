import dotenv from 'dotenv'
dotenv.config();
import { Pinecone } from '@pinecone-database/pinecone'
// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

async function deleteVectorData(){
//Delete the namespace with all the records in it 
const index = pc.index("dense-index", process.env.PINECONE_URL);
await index.namespace(process.env.PINECONE_NAMESPACE).deleteAll();
}

export default deleteVectorData;