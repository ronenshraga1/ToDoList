const express = require('express');
const app = express();
const port = 4001;
app.use(express.json());

app.post('/addmission', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});