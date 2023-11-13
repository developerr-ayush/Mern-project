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
      url: "https://images.unsplash.com/photo-1693234928596-7052022c15a8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    set: (e) =>
      e == ""
        ? {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1693234928596-7052022c15a8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }
        : e,
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
