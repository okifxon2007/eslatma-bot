const express = require('express');
const db = require('./database'); // 'database.js' faylini import qilish
const app = express();
const port = 3001;

app.use(express.json());

app.get('/data', (req, res) => {
  db.all("SELECT * FROM mytable", [], (err, rows) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).send('Server error');
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server ${port} portda ishlayapti`);
});
