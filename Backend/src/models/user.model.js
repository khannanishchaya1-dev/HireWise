const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:{
    unique: [true, 'Username already taken'],
    type: String,
  },
  email:{
    type: String,
    unique: [true, 'Email already registered'],
    required: [true, 'Email is required'],
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  password:{
    type:String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false,
  },
  age:{
    type: Number,
    required: [true, 'Age is required'],
      min: [13, 'You must be at least 13 years old to register'],
  }
},{timestamps: true})
const User = mongoose.model('User',userSchema);
module.exports = User;