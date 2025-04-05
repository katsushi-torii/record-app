// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const mangaRoutes = require('./routes/manga');

app.use(cors());
app.use(express.json());

// ルーティング
app.use('/api/manga', mangaRoutes);

// サーバー起動
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
