const express = require("express");
const { DateTime } = require("luxon");
const app = express();

app.get("/api/timestamp/", (req, res) => {
  const date = DateTime.local();
  const unix = date.toMillis();
  const utc = date.toHTTP();

  res.send({ unix, utc });
});

app.get("/api/timestamp/:year/:month/:day", (req, res) => {
  const { year, month, day } = req.params;

  let time = {
    year,
    month,
    day,
    zone: "utc",
  };

  const date = DateTime.fromObject(time);
  const unix = date.toMillis();
  const utc = date.toHTTP();

  if (!date.isValid) return res.status(400).send({ error: "Invalid Date" });

  res.send({ unix, utc });
});
app.get("/api/timestamp/:year/:month", (req, res) => {
  const { year, month } = req.params;

  let time = {
    year,
    month,
    zone: "utc",
  };

  const date = DateTime.fromObject(time);
  const unix = date.toMillis();
  const utc = date.toHTTP();

  if (!date.isValid) return res.status(400).send({ error: "Invalid Date" });

  res.send({ unix, utc });
});
app.get("/api/timestamp/:year", (req, res) => {
  const { year } = req.params;

  let time = {
    year,
    zone: "utc",
  };

  let date;
  let unix;
  let utc;

  if (year.length === 4) {
    date = DateTime.fromObject(time);
    unix = date.toMillis();
    utc = date.toHTTP();
  } else if (year.length > 4) {
    date = DateTime.fromMillis(parseInt(year));
    unix = date.toMillis();
    utc = date.toHTTP();
  }

  if (!date.isValid) return res.status(400).send({ error: "Invalid Date" });

  res.send({ unix, utc });
});

const port = process.env.PORT || 3000;

const server = app.listen(port, console.log(`Listening on port ${port}`));

module.exports = server;
