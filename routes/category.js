const express = require("express");
const {
  index,
  save,
  update,
  destroy,
} = require("../controllers/admin/category");
const { auth } = require("../middleware/auth");
const fileUpload = require("../middleware/fileUpload");

const router = express.Router();

router
  .route("/")
  .get(index)
  .post(
    auth,
    fileUpload({
      destination: "uploads/categories",
      filename: "file",
    }),
    save
  );
router.route("/:id").put(
  fileUpload({
    destination: "uploads/categories",
    filename: "file",
  }),
  update
);
router.route("/:id").delete(destroy);

module.exports = router;
