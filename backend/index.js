const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('E-commerce Backend is currently running');
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
