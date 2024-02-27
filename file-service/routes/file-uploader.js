const router = require("express").Router();
const { fileUploader } = require("../controllers/upload");

router.post("/upload", fileUploader.uploadFile);
router.delete("/delete/:filename", fileUploader.deleteFile);
module.exports = router;
