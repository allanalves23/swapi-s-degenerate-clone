module.exports = app => {

    const planets = new app.mongoose.Schema({
        _id: {type: app.mongoose.Schema.ObjectId, auto: true},
        name: {type: String, unique: true},
        climate: {type: String},
        terrain: {type: String},
        films: {type: [String]},
        countFilms: {type: Number}
    })

    const Planet = app.mongoose.model('planets', planets)

    return {Planet}
}