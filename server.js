const express = require('express');
const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, 'web')));

app.listen(9100, () => {
    console.info(`server started at localhost:${9100} ` + new Date().toLocaleString());
})