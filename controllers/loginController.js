// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/user.js';

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.send('login', {
//         message: "user does not exist",
//         type: 'error'
//       });
//     }

    
    
//     if (!user.isVerified) {
//       return res.send('login', {
//         message: "Please verify your email before logging in",
//         type: 'error'
//       });
//     }


 
    
    
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
      
//      return res.render('login', { 
//       message: 'Invalid email or password', 
//       type: 'error' 
//     });

//     }

    
    
//   const token = jwt.sign(
//     { _id: user._id, email: user.email,role: user.role },           //payload 
//     process.env.JWT_SECRET,                                         //secret 
//     { expiresIn: '1h' }              //option
//   );

  

    
    
//     res.cookie('token', token, {
//       httpOnly: true,                       //console.log(document.cookie); not accessible thats why use httpOnly true
//       maxAge: 60 * 60 * 1000  // 1 hour 
//     });

    
    
    
//     //  return res.render('login', { 
//     //   message: 'login successfull', 
//     //   type: 'success' 
//     // });

//     return res.redirect('/products');


    
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Something went wrong');
//   }
// };

// export { login };


import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', {
        message: 'User does not exist',
        type: 'error'
      });
    }

    

    if (!user.isVerified) {
      return res.render('login', {
        message: 'Please verify your email before logging in',
        type: 'error'
      });
    }

  
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { 
        message: 'Invalid email or password', 
        type: 'error' 
      });
    }



    // generating  JWT token

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );



    
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    // console.log(cookie.email);

    // Redirect after successful login
    return res.redirect('/products');

  } catch (err) {
    console.error(err);
    return res.render('login', { 
      message: 'Something went wrong', 
      type: 'error' 
    });
  }
};

export { login };
