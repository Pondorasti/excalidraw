const express = require("express");

const app = express();
app.use(
  express.static("build", {
    setHeaders(res) {
      res.set("document-policy", "js-profiling");
    },
  }),
);
app.listen(3000);
