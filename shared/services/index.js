const fs = require('fs');
const path = require('path');

let index = path.basename(__filename);
let files = fs.readdirSync(__dirname);

for (let file of files) {
    if (file !== index) {
        let name = path.basename(file, '.js');
        module.exports[name] = require(`./${file}`);
    }
}