const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }  
    const token = authHeader.split(' ')[1]; //frontend sends 'Bearer ${token}'
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'longsecretstring');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    // if token is not verified
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    // if token is verified
    req.userId = decodedToken.userId;
    next();
}