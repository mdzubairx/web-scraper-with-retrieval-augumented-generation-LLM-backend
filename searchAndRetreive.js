import dotenv from 'dotenv'
dotenv.config();
import { Pinecone } from '@pinecone-database/pinecone'
// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });


const namespace = pc.index("dense-index", process.env.PINECONE_URL).namespace(process.env.PINECONE_NAMESPACE);


// Search the dense index
async function SearchAndRetrieve(query){
  const results = await namespace.searchRecords({
    query: {
      topK: 10,
      inputs: { text: query },
    },
  });
  
  let retrievedChunks  = [];
  // Print the results
  results.result.hits.forEach(hit => {
    // console.log(`id: ${hit._id}, score: ${hit._score.toFixed(2)}, text: ${hit.fields.chunk_text},`);
    // console.log(hit);
    retrievedChunks.push(hit.fields.chunk_text);
  });
  
  let retrievedtext = retrievedChunks.join("\n\n---\n\n");
  // console.log(retrievedtext);
  return retrievedtext;
}

export default SearchAndRetrieve;