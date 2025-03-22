import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if (!token){
            return res.status(401).json({message: "No Token, authorization failed"});
        }

        try {
            const decode = Jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log("The decoded user is: ", req.user);
            next();
        } catch (error) {
            res.status(400).json({ message: "Token is not valid!"});
        }
    }else {
        res.status(400).json({ message: "Token is not available!" })
    }
}

export default verifyToken;