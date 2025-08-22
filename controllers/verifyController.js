import User from '../models/user.js';

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.render("login", {
      message: "Invalid verification link",
      type: "error"
    });
  }



  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.render("signup", {
        message: "Token invalid or expired",
        type: "error"
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();



    return res.render("login", {
      message: "Email verified successfully! You can now log in.",
      type: "success"
    });


    
  } catch (err) {
    console.error(err);
    res.render("signup", {
      message: "Something went wrong. Please try again later.",
      type: "error"
    });
  }
};

export { verifyEmail };
