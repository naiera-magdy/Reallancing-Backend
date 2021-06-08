const express = require('express');
const fileUpload = require('express-fileupload');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protectRoutes);

router.get('/me', userController.getMe, userController.getUser);

router.route('/update-avatar').post(fileUpload(), userController.updateAvatar);

router
  .route('/me/jobs')
  .get(authController.restrictTo('client'), userController.getMyJobs);

router.patch('/updateMe', userController.getMe, userController.updateUser);
router.delete('/deleteMe', userController.getMe, userController.deleteUser);

router
  .route('/user-stats')
  .get(authController.restrictTo('admin'), userController.getUserStats);
router
  .route('/freelancer-stats')
  .get(authController.restrictTo('admin'), userController.getFreelancerStats);
router
  .route('/monthly-plan')
  .get(authController.restrictTo('admin'), userController.getMonthlyPlan);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;
