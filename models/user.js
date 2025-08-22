import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,        
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  verificationToken: {
    type: String
  },

  verificationTokenExpires: {
    type: Date
  },

  resetPasswordToken: {
    type: String
  },

  resetPasswordExpire: {
    type: Date
  },

  
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'          
  }

  
}, {
  timestamps: true 
});

export default mongoose.model('User', userSchema);
