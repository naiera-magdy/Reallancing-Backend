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

// router.use(authController.restrictTo('admin')); Commented for ease of testing

router.route('/user-stats').get(userController.getUserStats);
router.route('/freelancer-stats').get(userController.getFreelancerStats);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
