const fetchHTML = require('./fetchHTML');

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const data = await fetchHTML(url);
      if (data) return data;
    } catch (error) {
      console.error(`Tentative ${i + 1} échouée, nouvelle tentative...`);
    }
  }
  throw new Error("Toutes les tentatives ont échoué");
}

module.exports = fetchWithRetry;
