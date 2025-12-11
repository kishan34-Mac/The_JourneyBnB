const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Listing = require('./models/listing.js');
require('dotenv').config();
const path = require("path");
const methodOverride=require("method-override");

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

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Root Route
app.get('/', (req, res) => {
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

// Edit form route (more specific path)
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) return res.status(404).send("Listing not found");
  res.render("listings/edit", { listing });
});

//Updated Route
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing, { runValidators: true });
  res.redirect(`/listings/${id}`);
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

// Create Route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

// Server Listen
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
