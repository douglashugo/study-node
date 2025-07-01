import app from "./src/app.js";

app.get('/', (req, res) => {
  res.send('Hello World!')
})
