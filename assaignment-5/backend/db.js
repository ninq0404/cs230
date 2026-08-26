const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if(!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir);
}

const db = new sqlite3.Database(path.join(__dirname, 'data', 'app.db'), (err) => {
    if(err)console.err('DB connection error:', err);
    else console.log('connected to sqlite database');
});

module.exports = db; 
