const auth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = 'your-secret-api-key-123';
  
  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or missing API key'
    });
  }
  
  next();
};

module.exports = auth; 