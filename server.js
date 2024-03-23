const express = require("express");
const path = require("path");
const app = express();
const assetsRouter = require("./server/assets-router");
app.use("/src", assetsRouter);
app.use("/", express.static(path.join(__dirname, "public")));
app.get("/api/v1", (req, res) => {
  res.json({
    project: "React and Express Boilerplate",
    from: "Vanaldito",
  });
});
app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
})
