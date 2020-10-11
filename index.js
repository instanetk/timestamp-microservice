const express = require("express");
const { DateTime } = require("luxon");
const app = express();

app.get("/api/timestamp/", (req, res) => {
  try {
    const date = DateTime.local();
    const unix = date.toMillis();
    const utc = date.toHTTP();
    res.send({ unix, utc });
  } catch (ex) {
    return res.status(400).send({ error: "Invalid Date" });
  }
});

app.get("/api/timestamp/:year/:month/:day", (req, res) => {
  const { year, month, day } = req.params;

  let time = {
    year,
    month,
    day,
    zone: "utc",
  };

  try {
    const date = DateTime.fromObject(time);
    const unix = date.toMillis();
    const utc = date.toHTTP();
    res.send({ unix, utc });
  } catch (ex) {
    return res.status(400).send({ error: "Invalid Date" });
  }
});

app.get("/api/timestamp/:year/:month", (req, res) => {
  const { year, month } = req.params;

  let time = {
    year,
    month,
    zone: "utc",
  };

  try {
    const date = DateTime.fromObject(time);
    const unix = date.toMillis();
    const utc = date.toHTTP();
    res.send({ unix, utc });
  } catch (ex) {
    return res.status(400).send({ error: "Invalid Date" });
  }
});
app.get("/api/timestamp/:date_string", (req, res) => {
  const { date_string } = req.params;

  let time = {
    date_string,
    zone: "utc",
  };

  let date;
  let unix;
  let utc;

  let regex = /^[0-9]*$/;

  let dateObject = new Date(date_string);

  try {
    if (DateTime.fromISO(date_string).isValid) {
      date = DateTime.fromISO(date_string);
      unix = date.toMillis();
      utc = date.toHTTP();
      console.log("case 1");
    } else if (regex.test(date_string) && dateObject !== "Invalid Date") {
      date = DateTime.fromMillis(parseInt(date_string));
      unix = date.toMillis();
      utc = date.toHTTP();
      console.log("case 2");
    } else {
      console.log("case 3");

      return res.status(400).send({ error: "Invalid Date" });
    }
    res.send({ unix, utc });
  } catch (ex) {
    return res.status(400).send({ error: "Invalid Date" });
  }
});

const port = process.env.PORT || 3000;

const server = app.listen(port, console.log(`Listening on port ${port}`));

module.exports = server;
