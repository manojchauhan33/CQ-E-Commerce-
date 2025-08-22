import bcrypt from 'bcrypt';
import User from '../models/user.js';

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.render("changePassword", {
        message: "User not found",
        type: "error"
      });
    }





    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.render("changePassword", {
        message: "Old password is incorrect",
        type: "error"
      });
    }




    if (newPassword !== confirmPassword) {
      return res.render("changePassword", {
        message: "New passwords do not match",
        type: "error"
      });
    }




    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res.render("changePassword", {
        message: "New password cannot be the same as the old password",
        type: "warning"
      });
    }

    
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

  
    
    res.clearCookie('token');

    return res.render("login", {
      message: "Password updated successfully. Please log in again.",
      type: "success"
    });



    
  } catch (err) {
    console.error(err);
    return res.render("changePassword", {
      message: "Something went wrong",
      type: "error"
    });
  }
};

export { changePassword };
