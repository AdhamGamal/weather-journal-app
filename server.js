
let projectData = [];
const port = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.static('website'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, ()=>{
  console.log(`running on localhost: ${port}`);
});

app.post('/add', (req, res)=> {
  projectData.push(req.body);
  res.send(projectData);
});

app.get('/all', (req, res)=>{
    res.send(projectData);
});
