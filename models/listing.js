const mongoose = require("mongoose");
const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    min: 20,
    max: [200, "Title must be shorter then 200 characters"],
  },
  description: {
    type: String,
    require: true,
    min: [40, "Description must have atleast 40 characters"],
  },
  image: {
    type: Object,
    require: true,
    default: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
  },
  price: {
    type: Number,
    require: true,
    min: [1, "Min price must be more then 1000"],
  },
  location: String,
  country: String,
});
const Listing = mongoose.model("Listing", ListingSchema);
module.exports.Listing = Listing;
