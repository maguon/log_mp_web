const express = require('express');
const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, 'web')));

app.listen(7000, () => {
    console.info(`server started at localhost:${7000} ` + new Date().toLocaleString());
})