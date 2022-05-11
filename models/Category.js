const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
  },
  coverImage: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Inactive",
  },
});
module.exports =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
