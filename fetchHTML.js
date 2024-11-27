const axios = require('axios');

async function fetchHTML(url) {
  try {
    const { data, headers } = await axios.get(url);
    if (headers['content-type'] && headers['content-type'].includes('text/html')) {
      return data;
    } else {
      throw new Error("Contenu non-HTML reçu");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la page :", error.message);
    return null;
  }
}

module.exports = fetchHTML;
