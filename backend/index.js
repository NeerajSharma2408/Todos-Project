const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/',require('./routes/notes'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.listen(5001,()=>{
    console.log("the apps running on port 5001");
})