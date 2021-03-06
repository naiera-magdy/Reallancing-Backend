const express = require('express');
const jobController = require('./../controllers/jobController');
const authController = require('./../controllers/authController');
const proposalRouter = require('./../routes/proposalRoutes');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protectRoutes);

router.use('/:jobId/proposals', proposalRouter);

router
  .route('/')
  .post(
    authController.restrictTo('client'),
    jobController.setClientId,
    jobController.createJob
  )
  .get(jobController.getAllJobs);

router
  .route('/job-stats')
  .get(authController.restrictTo('admin'), jobController.getJobStats); // Should be restricted to admin
router
  .route('/monthly-plan')
  .get(authController.restrictTo('admin'), jobController.getMonthlyPlan);

router
  .route('/:id')
  .get(jobController.getJob)
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob);

module.exports = router;
