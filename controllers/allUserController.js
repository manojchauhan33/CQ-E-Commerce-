import User from '../models/user.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });  
    res.render('allUser', { 
        users 
    });

  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Server Error');
  }
};
