const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/stock-price", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const intervalId = setInterval(() => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    res.write(`event: noey\ndata: ${randomNum}\n\n`);
  }, 1000);
  const intervalAnimalNames = setInterval(() => {
    const animalNames = [
      "Lion",
      "Elephant",
      "Giraffe",
      "Monkey",
      "Tiger",
      "Kangaroo",
      "Zebra",
      "Penguin",
      "Panda",
      "Koala",
    ];

    const randomNum = Math.floor(Math.random() * 100) + 1;
    const randomAnimalName = animalNames[randomNum % animalNames.length];
    res.write(`event: m\ndata: ${randomAnimalName}\n\n`);
  }, 1000);

  req.on("close", () => {
    clearInterval(intervalId);
    clearInterval(intervalAnimalNames);
    console.log('stop');
    res.end();
  });
});

// Start server
const port = 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
