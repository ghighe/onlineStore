exports.notFoundController = (req, res, next) => {
    //res.status(404).sendFile(path.join(currentDir, 'views', 'page-not-found.html'));
    res.status(404).render('404', {
        layout: false,
        path:'/404',
        pageTitle: 'Page not found'
    });
}