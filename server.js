const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const { Readability } = require('@mozilla/readability');
const { JSDOM } = require('jsdom');
const path = require('path'); // Add this line

const app = express();
app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Utilisateur.html')); // Adjust the path if needed
});

// Add your scraping route
app.post('/scrape', async (req, res) => {
  const { url } = req.body;
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const content = await page.content();
    const doc = new JSDOM(content);
    const article = new Readability(doc.window.document).parse();

    await browser.close();
    res.json({ title: article.title, content: article.textContent });
  } catch (error) {
    console.error("Erreur lors du scraping :", error);
    res.status(500).send("Erreur lors du scraping.");
  }
});

app.listen(3000, () => console.log('Serveur lancé sur http://localhost:3000'));