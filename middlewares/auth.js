import ExpressError from "../classes/ExpressError.js";

const isLoggedIn = (errorName) => async (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", `You must be logged in to ${errorName}!`);
    return res.redirect("/login");
  }
  next();
};

const saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

const isOwner = (modelName) => async (req, res, next) => {
  const { listingId, reviewId } = req.params;
  const modelId = reviewId || listingId; // Determine which ID to use based on the route
  const model = await modelName.findById(modelId);
  const userAccess =
    model._id == reviewId
      ? model.author.equals(req.user._id)
      : model.owner.equals(req.user._id);

  if (!userAccess) {
    req.flash(
      "error",
      `you are not the  ${
        model._id == reviewId ? "owner of this review" : "owner of this listing"
      }`
    );
    return res.redirect(`/listings/${listingId}`);
  } else {
    next();
  }
};

const validateSchema = (Schema) => async (req, res, next) => {
  let { error } = Schema.validate(req.body);

  if (error) {
    return next(new ExpressError(400, error));
  }

  next();
};

export { isLoggedIn, saveRedirectUrl, isOwner, validateSchema };
