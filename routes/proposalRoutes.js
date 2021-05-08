const express = require('express');
const proposalController = require('./../controllers/proposalController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protectRoutes);

router
  .route('/')
  .post(proposalController.createProposal)
  .get(proposalController.getAllProposals);

router
  .route('/:id')
  .get(proposalController.getProposal)
  .patch(proposalController.updateProposal)
  .delete(proposalController.deleteProposal);

module.exports = router;
