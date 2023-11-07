app.get('/set-cookie', (req, res) => {
    // Set a cookie named 'myCookie' with a value
    res.cookie('myCookie', 'cookieValue', {
      httpOnly: true, // Set the cookie as HTTP-only
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (in milliseconds)
    });  
  
    res.json({ 'message' : 'HTTP-only cookie set!' });
  });
  
  // Define a route to read the cookie (for testing)
  app.get('/get-cookie', (req, res) => {
    // Read the 'myCookie' value from the request's cookies
    console.log(req.cookies)
    const cookieValue = req.cookies.myCookie;
    if (cookieValue) {
      res.json({ 'message' : `Value of 'myCookie': ${cookieValue}`});
    } else {
      res.json({ 'message' : 'Cookie not found'});
    }
  });
