 const authenticate = (req, res, next) => {
    if (req.user && req.user.role === 'TPO') {
        return next();
    }
    return res.status(403).json({ msg: "Access denied, TPO only", success: false });
};
export default authenticate


