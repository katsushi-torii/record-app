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
    date_finished,
    rating,
    memo,
    last_read_type,
    last_read_number
  } = req.body;

  db.query(
    'INSERT INTO manga (title, date_finished, rating, memo, last_read_type, last_read_number) VALUES (?, ?, ?, ?, ?, ?)',
    [title, date_finished, rating, memo, last_read_type, last_read_number],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: '追加成功', id: result.insertId });
    }
  );
});

// 追加：DELETE /api/manga/:id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM manga WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: '削除成功' });
    });
});

// PUT /api/manga/:id
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const {
        title,
        date_finished,
        rating,
        memo,
        last_read_type,
        last_read_number
    } = req.body;

    db.query(
        `UPDATE manga SET 
        title = ?, 
        date_finished = ?, 
        rating = ?, 
        memo = ?, 
        last_read_type = ?, 
        last_read_number = ?
        WHERE id = ?`,
        [title, date_finished, rating, memo, last_read_type, last_read_number, id],
        (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: '更新成功' });
        }
    );
});
  
  

module.exports = router;
