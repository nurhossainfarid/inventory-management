module.exports.authorization = (...role) => {
    return (req, res, next) => {
        const userRoll = req.user.role;
        if (!role.includes(userRoll)) {
            return res.status(403).json({
                status: 'failed',
                error: "You are not authorized for this"
            })
        }
        next();
    }
}