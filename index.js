const extractData = require('./extractData');
const saveData = require('./saveData');

async function main() {
  const url = 'https://fr.wikipedia.org/wiki/Habiba_Ghribi';
  const productData = await extractData(url);
  await saveData(productData);
  console.log("Données du produit :", productData);
}

main();
