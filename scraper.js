import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import puppeteer from 'puppeteer';

async function scrapeAllText(url) {
  const browser = await puppeteer.launch({
    headless: 'new', // use 'true' if you're not debugging
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Extract all visible text from the body
  const content = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        // Filter out whitespace and invisible text
        if (!node.parentElement || node.parentElement.offsetParent === null) return NodeFilter.FILTER_REJECT;
        if (node.textContent.trim().length === 0) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    let text = '';
    while (walker.nextNode()) {
      text += walker.currentNode.textContent.trim() + ' ';
    }

    return text;
  });

  await browser.close();
  return content;
}

export default scrapeAllText;