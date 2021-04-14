const adminRole = 1;

module.exports = (req, res, next) => {
    if (!req.session.userLogin) {
        console.log("Paso el IF");
        next()
    } else {
        console.log("Paso el ELSE");
        if (req.session.userLogin.role == adminRole) {
            res.redirect('/admin/users/list');
        } else {
            res.redirect(`/users/${req.session.userLogin.id}`);            
        }
    }
}