const express = require('express');
const songRouter     = require('./routes/index.js');


const app = express();


app.use('/', songRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`he fixed the fern back at ${port}`);
});
