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
  .route('/:id')
  .get(jobController.getJob)
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob);

module.exports = router;
