import express from "express";
import path from "path";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import flash from "connect-flash";
import User from "./models/User.js";
import ExpressError from "./classes/ExpressError.js";
import ErrorMiddleware from "./middlewares/Error.js";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import { listingRoutes } from "./routes/listings.js";
import { reviewRoutes } from "./routes/reviews.js";
import { userRoutes } from "./routes/users.js";

dotenv.config();
const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Index route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

const ATLAS_URL = process.env.ATLAS_URL;
const SECRET = process.env.SECRET;

const store = MongoStore.create({
  mongoUrl: ATLAS_URL,
  crypto: {
    secret: SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR IN MONGO SESSION STORE", error);
});

const sessionOptions = {
  store,
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // secure: true
  },
};

// route sessions
app.use(session(sessionOptions));
app.use(flash());

//  Configuring Strategy
app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash middlewares
app.use((req, res, next) => {
  res.locals.MsgSuccess = req.flash("success");
  res.locals.MsgError = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// router routes
app.use("/listings", listingRoutes);
app.use("/listings/:listingId/reviews", reviewRoutes);
app.use("/", userRoutes);

// Error handling middleware
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// Error handling middleware
app.use(ErrorMiddleware);

export default app;
