const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // const authHeader = req.get('Authorization');
    // if(!authHeader) {
    //     const e = new Error('Not Authenticated');
    //     e.statusCode = 401;
    //     throw e;
    // }
    // const token = authHeader.split(' ')[1];
    const token = req.query.auth;
    // console.log(token);
    let decodeToken;
    try {
        decodeToken = jwt.verify(token, 'Iamthebest');
    } catch(e) {
        e.statusCode = 500;
        throw e;
    }
    if(!decodeToken) {
        const e = new Error('Not Authenticated');
        e.statusCode = 401;
        throw e;
    };
    req.userId = decodeToken.userId;
    next();
}