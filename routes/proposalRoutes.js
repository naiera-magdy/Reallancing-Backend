const express = require('express');
const proposalController = require('./../controllers/proposalController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// Protect all routes after this middleware
router.use(authController.protectRoutes);

router
  .route('/')
  .get(proposalController.setJobUserIds, proposalController.getAllProposals)
  .post(
    authController.restrictTo('freelancer'),
    proposalController.setJobUserIds,
    proposalController.createProposal
  );

router
  .route('/:proposalId/sendProposalAcceptance')
  .post(proposalController.sendProposalAcceptance);

router.route('/monthly-plan/:year').get(proposalController.getMonthlyPlan);

router
  .route('/:id')
  .get(proposalController.getProposal)
  .patch(proposalController.updateProposal)
  .delete(proposalController.deleteProposal);

module.exports = router;
