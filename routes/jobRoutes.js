const express = require('express');
const jobController = require('./../controllers/jobController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(authController.protectRoutes, jobController.createJob)
  .get(authController.protectRoutes, jobController.getAllJobs);

router
  .route('/:id')
  .get(authController.protectRoutes, jobController.getJob)
  .patch(authController.protectRoutes, jobController.updateJob)
  .delete(authController.protectRoutes, jobController.deleteJob);

module.exports = router;
