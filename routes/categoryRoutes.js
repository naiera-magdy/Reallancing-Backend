const express = require('express');
const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');

const router = express.Router();
router.use(authController.protectRoutes);
router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(authController.restrictTo('admin'), categoryController.createCategory);
router
  .route('/:id')
  .get(categoryController.getCategory)
  .delete(
    authController.restrictTo('admin'),
    categoryController.deleteCategory
  );
module.exports = router;
