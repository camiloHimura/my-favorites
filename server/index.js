const path = require('path');
const express = require('express');
const {PORT} = require('../app/contans');

const publicPath = path.join(__dirname, '..', 'public')
const App = express();
const port = process.env.PORT || PORT;

App.use(express.static(publicPath));

App.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
})

App.listen(port, () => {
  console.log('Listening port', port)
})