//   import bcrypt from 'bcrypt';
//   import crypto from 'crypto';
//   import nodemailer from 'nodemailer';
//   import User from '../models/user.js';

  

//   const signup = async (req, res) => {
//   const { name, email, password, confirmpassword, role } = req.body;

  
  
//   if (password !== confirmpassword) {
//     return res.render('signup', { 
//       message: 'Passwords do not match', 
//       type: 'error' 
//     });
//   }

  
  
//    try {
//     const existUser = await User.findOne({ email });
//     if (existUser) {
//       return res.render('signup', { 
//         message: 'This user already exists', 
//         type: 'warning' 
//       });
//     }

//     // console.log(req.body);
    
//     const hashedPassword = await bcrypt.hash(password, 10);       //await because hashing is heavy it takes time
//     const token = crypto.randomBytes(32).toString('hex');      
    
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       verificationToken: token,
//       verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000,   // 24 hours 
//       role: role || 'customer'
//     });

    
//     // console.log(newUser);


//     await newUser.save();


//    const transporter = nodemailer.createTransport({
//     service: 'gmail', 
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//         }
//     });


//     // const verifyLink = `http://localhost:3000/verify/${token}`;
//      const verifyLink = `${req.protocol}://${req.get('host')}/verify/${token}`;

//     await transporter.sendMail({
//       from: process.env.MAIL_USER,
//       to: email,
//       subject: 'Verify your email',                                                     //<-mail jayegi like this from  MAIL_USER 
//       html: `
//         <h2>Hello ${name},</h2>
//         <p>Please verify your email via click on link </p>
//         <a href="${verifyLink}">${verifyLink}</a>
//         <p>This link will expire in 24 hours</p>
//       `
//     });

//     return res.render('login', { 
//       message: 'Please verify your email before login', 
//       type: 'success' 
//     });


//     res.redirect('/login');


//   } catch (err) {
//     console.error('Error:', err);
//         res.render('signup', { 
//           message: 'Something went wrong', 
//           type: 'error' 
//         });
//   }
// };


// export { signup };

  
   


import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/user.js';


const sendVerificationEmail = async (user, req) => {
  const verifyLink = `${req.protocol}://${req.get('host')}/verify/${user.verificationToken}`;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Verify your email',
    html: `
      <h2>Hello ${user.name}</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verifyLink}">${verifyLink}</a>
      <p>This link expires in 24 hours.</p>
    `
  });
};



const signup = async (req, res) => {
  const { name, email, password, confirmpassword, role } = req.body;
  

  if (password !== confirmpassword) {
    return res.render('signup', { 
      message: 'Passwords do not match', 
      type: 'error' 
    });
  }

  try {
    const existUser = await User.findOne({ email });

    if (existUser) {
      if (existUser.isVerified) {
        return res.render('signup', { 
          message: 'This user already exists', 
          type: 'warning' 
        });

      } 

      else if (existUser.verificationTokenExpires > Date.now()) {
        return res.render('signup', { 
          message: 'Please check your email to verify your account.', 
          type: 'warning' 
        });
      } 

      
      else {
        await User.deleteOne({ _id: existUser._id });
      }
    }


    const hashedPassword = await bcrypt.hash(password, 10);  // reason to write await is it is a computationally expensive operation

    const token = crypto.randomBytes(32).toString('hex'); 



    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken: token,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      role: role || 'customer'
    });





    await newUser.save();
    await sendVerificationEmail(newUser, req);


    return res.render('login', { 
      message: 'Please verify your email before login , verification sent in ypur mail', 
      type: 'success' 
    });



  } catch (err) {
    console.error('Error:', err);
    return res.render('signup', { 
      message: 'Something went wrong', 
      type: 'error' 
    });
  }
};

export { signup };




