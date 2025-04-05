// backend/routes/manga.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// 一覧取得
router.get('/', (req, res) => {
  db.query('SELECT * FROM manga ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 登録
router.post('/', (req, res) => {
  const {
    title,
    series_name,
    date_finished,
    rating,
    memo,
    last_read_type,
    last_read_number
  } = req.body;

  db.query(
    'INSERT INTO manga (title, series_name, date_finished, rating, memo, last_read_type, last_read_number) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, series_name, date_finished, rating, memo, last_read_type, last_read_number],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: '追加成功', id: result.insertId });
    }
  );
});

module.exports = router;
