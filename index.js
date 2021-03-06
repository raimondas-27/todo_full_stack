const express = require('express');
const app = express();

const path = require('path');

//aplikos kintamieji
require('dotenv').config()


const cors = require('cors');

const mongoose = require('mongoose');


const PORT = process.env.USER_PORT || 3002;


app.use(cors());
// middle ware - to get req.body in json
app.use(express.json());

const todoApi = require('./api/todoApi');

app.use('/', todoApi);

const rootbuild = path.join(__dirname,"client","build")

if (process.env.NODE_ENV === "production") {
   app.use(express.static(rootbuild))
}

app.get("*", (req, res) => {
   res.sendFile(path.join("index.html", {root: rootbuild}))
})

// prisijungimas prie duomenu bazes
mongoose
  .connect(process.env.MONGO_CONN_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('Conneced to Mongo ooooooooose');
    app.listen(PORT, console.log(`backEnd ondline on port ${PORT}`));
  })
  .catch((err) => console.error(err.message));
