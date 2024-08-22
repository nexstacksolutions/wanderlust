import User from "../models/User.js";

const loginForm = async (req, res, next) => {
  res.render("users/login");
};

const signupForm = async (req, res, next) => {
  res.render("users/register");
};

const loginUser = async (req, res, next) => {
  req.flash("success", "welcome back to wanderlust");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

const signupUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body.user;

    const newUser = new User({
      username: username,
      email: email,
    });

    let registerUser = await User.register(newUser, password);

    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome to wanderlust");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have been logged out successfully."); // Set flash message before redirect
    res.redirect("/listings");
  });
};

export const userController = {
  loginForm,
  signupForm,
  loginUser,
  signupUser,
  logoutUser,
};
