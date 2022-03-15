let isAdmin = (req, res, next) => {
    
    if (req.user.role == "admin") {
        next()
    }
    else {
        return res.status(403).send({success: false, msg:"only admin can access this route"})
    }
}

module.exports = isAdmin;