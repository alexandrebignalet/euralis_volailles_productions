const express = require('express');
const app = express();

app.use(express.static('./build/web'));

const port = 8080;
app.listen(port, function() {
  console.log(`Web prod build is listening on http://localhost:${port}!`)
});
