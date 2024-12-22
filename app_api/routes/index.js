const express = require("express");
const router = express.Router();

const VenueController = require("../controllers/VenueController.js");
const CommentController = require("../controllers/CommentController.js");

router
  .route("/venues")
  .get(VenueController.listVenues)
  .post(VenueController.addVenue);

router
  .route("/venues/:venueId")
  .get(VenueController.getVenue)
  .put(VenueController.updateVenue)
  .delete(VenueController.deleteVenue);

router.route("/venues/:venueId/comments").post(CommentController.addComment);

router
  .route("/venues/:venueId/comments/:commentId")
  .get(CommentController.getComment)
  .put(CommentController.updateComment)
  .delete(CommentController.deleteComment);

module.exports = router;
