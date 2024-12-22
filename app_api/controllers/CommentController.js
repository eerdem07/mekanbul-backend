const Venue = require("../models/Venue");

const createResponse = (res, status, content) => {
  res.status(status).json(content);
};

exports.listComments = (req, res, next) => {};

const calculateLastRating = (incomingVenue, isDeleted) => {
  let i,
    avgRating,
    sumRating = 0;

  const comments = incomingVenue.comments || [];

  const numComments = incomingVenue.comments.length;

  if (incomingVenue.comments) {
    if (incomingVenue.comments.length == 0 && isDeleted) {
      avgRating = 0;
    } else {
      for (i = 0; i < numComments; i++) {
        sumRating = sumRating + incomingVenue.comments[i].rating;
      }
      avgRating = Math.ceil(sumRating / numComments);
    }

    incomingVenue.rating = avgRating;
    incomingVenue.save();
  }
};

const updateRating = (venueId, isDeleted) => {
  console.log(venueId);
  Venue.findById(venueId)
    .select("rating comments")
    .exec()
    .then(function (venue) {
      calculateLastRating(venue, isDeleted);
    });
};

const createComment = (req, res, incomingVenue) => {
  const newComment = {
    author: req.body.author,
    text: req.body.text,
    rating: req.body.rating,
  };

  incomingVenue.comments.push(newComment);

  incomingVenue
    .save()
    .then((venue) => {
      const comments = venue.comments;
      const comment = comments[comments.length - 1];
      updateRating(venue._id, false);
      createResponse(res, "201", venue);
    })
    .catch((err) => {
      createResponse(res, "400", err);
    });
};

exports.addComment = async (req, res, next) => {
  const venueId = req.params.venueId;

  try {
    await Venue.findById(venueId)
      .select("comments")
      .exec()
      .then((incomingVenue) => {
        createComment(req, res, incomingVenue);
      });
  } catch (err) {
    createComment(res, "400", { status: "Yorum eklemenemedi!" });
  }
};

exports.getComment = async (req, res, next) => {
  try {
    const venueId = req.params.venueId;
    const commentsId = req.params.commentId;

    await Venue.findById(venueId)
      .select("_id name comments")
      .exec()
      .then((venue) => {
        console.log(venue);
        if (!venue) createResponse(res, "404", "MekanId hatalı!");

        if (!venue.comments.id(commentsId)) {
          createResponse(res, "404", "YorumId yanlış!");
        }

        const comment = venue.comments.id(commentsId);

        const response = {
          venue: {
            name: venue.name,
            id: venue.id,
          },
          comment: { comment },
        };

        createResponse(res, 200, response);
      });
  } catch (err) {
    createResponse(res, 404, "Mekan Bulunamadı!");
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    console.log(req.body);
    const venueId = req.params.venueId;
    const commentId = req.params.commentId;

    await Venue.findById(venueId)
      .select("comments")
      .exec()
      .then((venue) => {
        try {
          let comment = venue.comments.id(commentId);
          comment.set(req.body);

          venue.save().then(function () {
            updateRating(venue._id, false);
            createResponse(res, "201", comment);
          });
        } catch (err) {
          createResponse(res, "400", err);
        }
      });
  } catch (err) {
    createResponse(res, "400", err);
  }
};

exports.deleteComment = async (req, res, next) => {
  const venueId = req.params.venueId;
  const commentId = req.params.commentId;
  try {
    await Venue.findById(venueId)
      .select("comments")
      .exec()
      .then(function (venue) {
        try {
          let comment = venue.comments.id(commentId);
          comment.deleteOne();
          venue.save().then(function () {
            updateRating(venue._id, true);
            createResponse(res, "200", {
              status: comment.author + " isimli kişinin yorumu silindi",
            });
          });
        } catch (error) {
          createResponse(res, "400", error);
        }
      });
  } catch (error) {
    createResponse(res, "400", error);
  }
};
