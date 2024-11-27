const cheerio = require('cheerio');
const fetchHTML = require('./fetchHTML');

async function extractData(url) {
  const html = await fetchHTML(url);
  if (!html) return { title: '', price: '', description: '' };

  const $ = cheerio.load(html);
  const productTitle = $('.product-title').text().trim() || "Non disponible";
  const productPrice = $('.product-price').text().trim() || "Non disponible";
  const productDescription = $('.product-description').text().trim() || "Non disponible";

  return { title: productTitle, price: productPrice, description: productDescription };
}

module.exports = extractData;
