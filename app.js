const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
require("dotenv").config();
const path = require("path");
const methodOverride = require("method-override");
 

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Root Route
app.get("/", (req, res) => {
  res.send("Helloo");
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
  try {
    const newListing = new Listing(req.body.listing);
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
  try {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing, {
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

// Show route (must be after /new and /:id/edit)
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

// Server Listen
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
