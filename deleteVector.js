import { Pinecone } from '@pinecone-database/pinecone'
// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: 'pcsk_2b7LVW_CdVk8jDXtZbrUCdoybfdj7YcqMfuLEVh3LGt52hxMpVx6svHTt4ZTZDDv3BXJ5H' });

async function deleteVectorData(){
//Delete the namespace with all the records in it 
const index = pc.index("dense-index", "https://dense-index-z336jvv.svc.aped-4627-b74a.pinecone.io")
await index.namespace('My-First-NameSpace-For-RAG').deleteAll();
}

export default deleteVectorData;