module.exports =async (req, res, next) => {
    const authHeader = req.headers.authorization;

    
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
              data: null,
              error: "Please provide token",
            });
        }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET)
        
        req.user = decoded.id;
        req.role = decoded.role
        next();
        
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: "Invalid token provided",
        });
    }
    
};