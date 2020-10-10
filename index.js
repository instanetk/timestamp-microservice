const express = require("express");
const { DateTime } = require("luxon");
const app = express();

app.get("/api/timestamp/:year/:month/:day", (req, res) => {
  const year = req.params.year;
  const month = req.params.month;
  const day = req.params.day;

  let time = {
    year,
    month,
    day,
    zone: "utc",
  };

  const date = DateTime.fromObject(time);
  const unix = date.toMillis();
  const utc = date.toHTTP();

  if (!date.isValid)
    return res.status(400).send("Invalid time format. YYYY/MM/DD");

  res.send({ unix, utc });
});

const port = process.env.PORT || 3000;

const server = app.listen(port, console.log(`Listening on port ${port}`));

module.exports = server;
