module.exports = app =>{ 
    
    app.route('/planets')
        .post(app.api.planets.save)
        .get(app.api.planets.get)
        
    app.route('/planets/:id')
        .get(app.api.planets.getById)
        .put(app.api.planets.save)
        .delete(app.api.planets.remove)
}
