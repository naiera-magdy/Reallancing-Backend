const express = require('express');
const authController = require('../controllers/authController');
const skillController = require('../controllers/skillController');

const router = express.Router();
router.use(authController.protectRoutes);
router
  .route('/')
  .get(skillController.getAllSkills)
  .post(authController.restrictTo('admin'), skillController.createSkill);

router
  .route('/:id')
  .get(skillController.getCategorySkills)
  .delete(authController.restrictTo('admin'), skillController.deleteSkill);
module.exports = router;
