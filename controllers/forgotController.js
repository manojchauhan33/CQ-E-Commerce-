import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/user.js';

const sendResetLink = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("forgotPassword", {
        message: "No account found with that email.",
        type: "error"
      });
    }

    

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpire = Date.now() + 15 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = resetTokenExpire;
    await user.save();


    const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

    

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });


    const mailOptions = {
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Link',
      html: `
        <h3>Password Reset</h3>
        <p>You requested a password reset. Click below to reset your password:</p>
        <a href="${resetURL}">${resetURL}</a>
        <p>This link will expire in 15 minutes.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.render("forgotPassword", {
      message: "Link sent! Check your email.",
      type: "success",
      redirect: "/login"   
    });




  } catch (error) {
    console.error(error);
    return res.render("forgotPassword", {
      message: "Server error. Please try again later.",
      type: "error"
    });
  }
};

export { sendResetLink };
