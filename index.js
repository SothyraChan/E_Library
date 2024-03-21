const express = require('express');
const app = express();
const port = 3000;
app.use(express.json()); //middleware
app.get('/', (req, res) => res.send('E-Library')); //routes
app.listen(port, () => console.log('E-Library is listening at http://localhost:${port}'));