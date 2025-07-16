import { Pinecone } from '@pinecone-database/pinecone'
// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: 'pcsk_2b7LVW_CdVk8jDXtZbrUCdoybfdj7YcqMfuLEVh3LGt52hxMpVx6svHTt4ZTZDDv3BXJ5H' });


const namespace = pc.index("dense-index", "https://dense-index-z336jvv.svc.aped-4627-b74a.pinecone.io").namespace("My-First-NameSpace-For-RAG");


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