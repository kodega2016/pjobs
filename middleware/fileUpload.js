const multer = require("multer");
const path = require("path");

const fileUpload = ({ destination, filename }) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/${destination}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
  });

  return multer({ storage: storage }).single(filename);
};

module.exports = fileUpload;
