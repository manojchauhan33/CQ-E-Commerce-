import bcrypt from 'bcrypt';
import User from '../models/user.js';



const renderResetForm = async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.render("resetPassword", {
        message: "Invalid or expired token.",
        type: "error"
      });
    }

    res.render("resetPassword", { token });
  } catch (err) {
    console.error(err);
    res.render("resetPassword", {
      message: "Server error. Please try again later.",
      type: "error"
    });
  }
};



const updatePassword = async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.render("resetPassword", {
        message: "Invalid or expired token.",
        type: "error"
      });
    }



    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);



    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();


    return res.render("login", {
      message: "Password updated successfully! Now you can log in.",
      type: "success"
    });



  } catch (err) {
    console.error(err);
    res.render("resetPassword", {
      message: "Server error. Please try again later.",
      type: "error"
    });
  }
};

export { renderResetForm, updatePassword };
