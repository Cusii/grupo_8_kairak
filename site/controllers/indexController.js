module.exports = {
    index: (req, res) => {
        res.render('index', { titlePage: 'Express', title: 'Express' });
    }
}