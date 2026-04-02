import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({

     name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
     address: {
      type: String,
      required: true,
      trim: true,
    },
    regularPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
     bathrooms: {
      type: Number,
      required: true,

    },

    bedrooms: {
      type: Number,
      required: true,

    },

    furnished: {
      type: Boolean,
      required: true,
    },
     parking: {
      type: Boolean,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["rent", "sale"],
    },
     offer: {
      type: Boolean,
      required: true,
    },
     imageUrls: {
      type: Array,
      required: true,

    },
     userRef: {
      type: String,
      required: true,
    },
},{ timestamps: true })

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;