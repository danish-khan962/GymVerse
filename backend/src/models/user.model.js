const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  authId: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isDoctor: {
    type: Boolean,
    default: false
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: false
  },

  score:{
    type:Number,
    default:0
  },

  inbox: [{
    text: {
      required: true,
      type: String,
    },
    doctorId: {
      required:true,
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }

  }],

  


}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
