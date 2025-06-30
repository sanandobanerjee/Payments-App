const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

//403 means auth error
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

//next block checks if token starts with 'Bearer '(the api key)
//also checks actual token

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    //split the token by getting only 2nd element, removing Bearer
    const token = authHeader.split(' ')[1];

    //this block verifies the split token
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.userId){
            req.userId=decoded.userId;
            next();
        }else{
            return res.json(403);
        }

    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}