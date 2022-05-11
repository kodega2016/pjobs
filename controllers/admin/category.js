const asyncHandler = require("../../middleware/asyncHandler");
const ErrorResponse = require("../../utils/ErrorResponse");

const {
  getAllCategories,
  createCategory,
  updateCategory,
  getCategoryByParams,
  deleteCategoryById,
} = require("../../services/category");

exports.index = asyncHandler(async (req, res, next) => {
  const categories = await getAllCategories();

  return res.status(200).json({
    data: categories,
    message: "Categories fetched successfully",
    status: true,
  });
});

exports.save = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  let data = {
    name,
    description,
  };

  if (req.file) {
    const filePath = process.env.BASE_URL + "/uploads/" + req.file.filename;
    data["coverImage"] = filePath;
  }

  const category = await createCategory(data);
  return res.status(200).json({
    data: category,
    message: "Category created successfully",
    status: true,
  });
});
exports.update = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;

  let data = {
    name,
    description,
  };
  let category = await getCategoryByParams({ _id: id });

  if (req.file) {
    const filePath = process.env.BASE_URL + "/uploads/" + req.file.filename;
    data["coverImage"] = filePath || category.coverImage;
  }

  if (!category) {
    return next(new ErrorResponse("Category not found", 404));
  }

  category = await updateCategory(id, data);

  return res.status(200).json({
    data: category,
    message: "Category updated successfully",
    status: true,
  });
});

exports.destroy = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let category = await getCategoryByParams({ _id: id });

  if (!category) {
    return next(new ErrorResponse("Category not found", 404));
  }

  await deleteCategoryById(id);

  return res.status(200).json({
    data: null,
    message: "Category deleted successfully",
    status: true,
  });
});
