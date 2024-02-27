const multer = require("multer");
const path = require("path");
const { unlink } = require("node:fs/promises");

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    const randomFileName =
      Date.now().toString() +
      (Math.random() * 100000).toString() +
      file.originalname;
    callback(null, randomFileName);
  },
});

const upload = multer({
  storage: Storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
}).single("file");

exports.fileUploader = {
  async uploadFile(req, res) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).send("Multer error", err);
      } else if (!req.file) {
        return res.status(500).json({ error: "Please select a file" });
      }
      return res.status(200).send(req.file.filename);
    });
  },
  async deleteFile(req, res) {
    const { filename } = req.params;
    console.log(filename);
    const filePath = path.join(__dirname, `../uploads/${filename}`);
    console.log(filePath);
    try {
      const deleted = await unlink(filePath);
      return res.status(200).send("File deleted successfully");
    } catch (err) {
      return res.status(500).send("Error deleting file", err);
    }
  },
};
