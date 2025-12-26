const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
require("dotenv").config();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./public/utils/ExpressError.js");


const MONGO_URL = process.env.MONGO_URL;

// Database Connection
main()
  .then(() => {
    console.log("Connected to DataBase💖");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// View engine setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Root Route
app.get("/", async(req, res) => {
  const featured=await Listing.find({}).limit(3);
  res.render("home",{featured})
});

// Listings index route
app.get("/listings", async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching listings");
  }
});

// New listing form route
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

// Create Route
app.post("/listings", async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(404, "send Valid data fro listing")
  }

  try {
    const data = req.body.listing;
    // If image comes as plain string (name="listing[image]")

    if (data && typeof data.image === "string") {
      data.image = {
        filename: "listingimage",
        url: data.image,
      };
    }

    const newListing = new Listing(data);
    await newListing.save();
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating listing");

  }
});

// Edit form route
app.get("/listings/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) return res.status(404).send("Listing not found");
    res.render("listings/edit", { listing });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error loading edit form");
  }
});

// Update Route
app.put("/listings/:id", async (req, res) => {
    if(!req.body.listing){
       throw new ExpressError(404,"send Valid data fro listing")
    }
  try {
    const { id } = req.params;
    const data = req.body.listing;

    // Normalize image on update too
    if (data && typeof data.image === "string") {
      data.image = {
        filename: "listingimage",
        url: data.image,
      };
    }

    await Listing.findByIdAndUpdate(id, data, {
      runValidators: true,
    });
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating listing");
  }
});

// Delete Route 
app.delete("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) return res.status(404).send("Listing not found");
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting listing");
  }
});

// Show route
app.get("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }
    res.render("listings/show", { listing });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching listing");
  }
});

//Custom error
// 404 handler (put this AFTER all routes)
app.all("/{*splat}", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// Error handler (MUST be last)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.status(statusCode).render("error", { statusCode, message });
});


// Server Listen
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
