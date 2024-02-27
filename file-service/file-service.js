const express = require("express");
const cors = require("cors");
const router = require("./routes/file-uploader");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use("/images", express.static("uploads"));
app.listen(3002, () => {
  console.log("Server started on port 3002");
});
