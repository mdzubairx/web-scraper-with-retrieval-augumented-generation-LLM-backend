import dotenv from 'dotenv'
dotenv.config();
// Import the Pinecone library
import { Pinecone } from '@pinecone-database/pinecone'

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

// Create a dense index with integrated embedding
const indexName = 'dense-index';
await pc.createIndexForModel({
  name: indexName,
  cloud: 'aws',
  region: 'us-east-1',
  embed: {
    model: 'llama-text-embed-v2',
    fieldMap: { text: 'chunk_text' },
  },
  waitUntilReady: true,
});


// Target the index  (My note- this is actually creating a namespace )
const index = pc.index("dense-index").namespace(process.env.PINECONE_NAMESPACE);





// Wait for the upserted vectors to be indexed
// await new Promise(resolve => setTimeout(resolve, 10000));

// View stats for the index
// const stats = await index.describeIndexStats();
// console.log(stats);


// Define the query
// const query = 'Perfect health is the best thing anyone could have in life. you can not enjoy if you dont have a good mental and physical health';

// Search the dense index
// const results = await index.searchRecords({
//   query: {
//     topK: 5,
//     inputs: { text: query },
//   },
// });

// Print the results
// results.result.hits.forEach(hit => {
  // console.log(`id: ${hit._id}, score: ${hit._score.toFixed(2)}, text: ${hit.fields.chunk_text},`);
  // console.log(hit);
  
// });
