 const logout = (req, res) => {

  res.clearCookie('token', {
     httpOnly: true 
  });

  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');


  res.redirect('/login');
};

export {logout};