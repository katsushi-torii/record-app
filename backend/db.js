// backend/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // XAMPPでパスワードが設定されていなければ空
  database: 'record_app'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

module.exports = db;
