const express = require('express');
const proposalController = require('./../controllers/proposalController');

const router = express.Router();

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
