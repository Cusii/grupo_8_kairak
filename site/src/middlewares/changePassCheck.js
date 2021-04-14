const adminRole = 1;

module.exports = (req, res, next) => {
    if (req.session.userLogin.id == req.params.id) {
        next()
    } else {
        if (req.session.userLogin.role == adminRole) {
            res.redirect('/admin/users/list');
        } else {
            res.redirect(`/users/${req.params.id}`);            
        }
    }
}