require('dotenv').config();
const express = require('express');
const songRouter     = require('./routes/song.js');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();

app.set("views", "views")
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json())
app.use('/songs/', songRouter)


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`he fixed the fern back at ${port}`);
});
