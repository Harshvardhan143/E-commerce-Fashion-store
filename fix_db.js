const fs = require('fs');

let pPath = 'd:/Workspace/Fashion-Shop/src/data/products.json';
let dbPath = 'd:/Workspace/Fashion-Shop/src/data/db.json';

let products = JSON.parse(fs.readFileSync(pPath, 'utf8'));
// Keep product 1, 2, 19, 20, 21, 22, 23.
let validIds = ["1", "2", "19", "20", "21", "22", "23"];
let filteredProducts = products.filter(p => validIds.includes(p.id));
fs.writeFileSync(pPath, JSON.stringify(filteredProducts, null, 2));

let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
db.products = db.products.filter(p => validIds.includes(p.id));
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

console.log('Deleted broken products from json');
