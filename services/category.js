const Category = require("../models/Category");

exports.getAllCategories = async (params) => {
  return await Category.find(params);
};
exports.createCategory = async (data) => {
  return await Category.create(data);
};
exports.getCategoryByParams = async (params) => {
  return await Category.findOne(params);
};
exports.updateCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  });
};
exports.deleteCategoryById = async (id) => {
  return await Category.findByIdAndDelete(id);
};
