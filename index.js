import express from 'express';
const app = express();
import cors from 'cors';
import scrapeAllText from './scraper.js';
import getResponse from './Summarize.js';
import EmbeddandStoreData from './Embedd&Store.js';
import SearchAndRetrieve from './searchAndRetreive.js';
import ChatBotgetResult from './chatbot.js';
import deleteVectorData from './deleteVector.js'
// import uniqid from "uniqid";
import dotenv from 'dotenv'
dotenv.config();
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from '@pinecone-database/pinecone'
// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const namespace = pc.index("dense-index", process.env.PINECONE_URL).namespace(process.env.PINECONE_NAMESPACE);


app.use(cors({
  origin : ["http://localhost:5173", "https://web-scraper-with-RAG.onrender.com"],
   methods: ['GET', 'POST', 'DELETE'],
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res)=>{
  res.send("The server and website is live");
})

app.post('/summarize', (req, res)=>{
  let Url = req.body.InputLink;
  scrapeAllText(Url).then((Content)=>{
    getResponse(Content).then((Summarizedtxt)=>{
      // console.log(Summarizedtxt);
      res.json({text : Summarizedtxt, scrapedTxt: Content });
    }).catch((err)=>{
      console.log(err);
    })
  })
})

app.post('/ScrapAndChat', (req, res)=>{
  let Url = req.body.InputLink;
  scrapeAllText(Url).then((content)=>{


    deleteVectorData().then((response)=>{
      console.log("The Previous Vector Data is deleted successfully");
    }).catch((err)=>{
      console.log(err);
    })


    EmbeddandStoreData(content).then((response)=>{
      res.json({statusNow: "data is scraped and stored sucessfully"});
    })
  }).catch((err)=>{
    console.log(err);
  })
})

app.post('/chat', (req, res)=>{
  let query = req.body.chatmsg;
  SearchAndRetrieve(query).then((retrievedtext)=>{
    ChatBotgetResult(query, retrievedtext).then((ans)=>{
      res.json({answer : ans});
    })
  }).catch((err)=>{
    console.log(err);
  })
})

app.delete('/delete-vector-data', (req, res)=>{
  deleteVectorData().then((response)=>{
    console.log("The Vector Data is deleted successfully");
  }).catch((err)=>{
    console.log(err);
  })
})

app.listen(3000, (req, res)=>{
  console.log("Server is live at port 3000");
})




























































































// const puppeteer = require('puppeteer');

// async function scrapeWebsite(url) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(url);
//   const content = await page.evaluate(() => {
//     return Array.from(document.querySelectorAll('p')).map(p => p.innerText).join(' ');
//   });
//   await browser.close();
//   console.log(content);
//   return content;  
// }
