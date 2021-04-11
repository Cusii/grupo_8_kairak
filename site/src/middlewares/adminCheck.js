const adminRole = 1;

module.exports = (req, res, next) => {
	if(req.session.userLogin && req.session.userLogin.role == adminRole) {
		next()
	}else{
		res.redirect('/')
	}
}