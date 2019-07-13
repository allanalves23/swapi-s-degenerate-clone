const rp = require('request-promise')

module.exports = app => {
    
    const {Planet} = app.config.mongooseSchemas
    const {exists} = app.config.validation
    const {managePlanetErrors} = app.config.errorManagement
    const variables = app.config.variables
    
    const get = async (req, res) => {
        
        
        try {
            var limit = parseInt(req.query.limit) || 10
            const page = req.query.page || 1
            const name = req.query.search || ''

            if(limit > 100) limit = 10

            const counter = await countPlanets(name)
            
            if(!counter.status) throw 'Ocorreu um erro ao obter a contagem de planetas'
            
            Planet.aggregate([
                {   
                    $match: {
                        name: {$regex: `${name}`, $options: 'i'}
                    }
                }
            ]).skip(page * limit - limit)
            .limit(limit)
            .then(planets => {

                const response = {
                    count: counter.count,
                    limit,
                    planets,
                    url: `${variables.url}/planets?page=${page}`,
                    resource: `/planets`,
                    methodAllowed: 'get, post',
                    paramsAllowed: 'limit, page, name'
                }

                res.json(response)
            })

        } catch (error) {
            return res.status(500).send(error)
        }
    }

    const countPlanets = async (name) => {
        try {
            let count = await Planet.find({   
                    name: {$regex: `${name}`, $options: 'i'}
            }).countDocuments()

            return {count, status: true}
            
        } catch (error) {
            return {count: 0, status: false}
        }
    }

    const getById = async (req, res) => {
        try {

            const _id = req.params.id || ''

            await Planet.findOne({_id}).then(planet => {
                if(planet){
                    const response = {
                        planet,
                        url: `${variables.url}/planets/${planet._id}`,
                        resource: `/planets/:id`,
                        methodAllowed: 'get, put, delete',
                    }
                    
                    return res.json(response)
                }

                throw 'Planeta não encontrado'

            })

        } catch (error) {
            error = await managePlanetErrors(error)
            return res.status(error.code).send(error)
        }
    }

    const remove = async (req, res) => {
        try {

            const _id = req.params.id || ''

            await Planet.deleteOne({_id}).then( resp => {
                
                if(resp.ok === 1 && resp.deletedCount > 0){
                    const response = {
                        status: 'ok',
                        resource: `/planets/:id`,
                        methodAllowed: 'get, put, delete',
                    }
    
                    return res.status(200).send(response)
                }

                if(resp.ok === 0) throw 'Ocorreu um erro inesperado ao tentar remover o planeta'
                if(resp.ok === 1 && resp.deletedCount === 0) throw 'Planeta não encontrado'
            })

        } catch (error) {
            error = await managePlanetErrors(error)
            return res.status(error.code).send(error)
        }
    }

    const save = async (req, res) => {
        
        let planet = {...req.body}
        const _id = req.params.id

        
        try {
            exists(planet.name, 'Nome não informado')
            exists(planet.climate, 'Clima não informado')
            exists(planet.terrain, 'Terreno não informado')

            planet = await getFilms(planet)

            var op = {status: false}

            if(planet._id){
                op = await updatePlanet(planet, _id)
            }else{
                op = await createPlanet(planet)
            }

            return res.status(op.code).send(op)
            
            
        } catch (error) {
            error = await managePlanetErrors(error)
            return res.status(error.code).send(error)
        }
    }


    const createPlanet = async (planet) => {
        try {
            let _STATUS = {code: 201}

            const swPlanet = new Planet(planet)
            
            const newPlanet = await swPlanet.save().catch(error => {
                if(error.code === 11000) throw 'Já existe um planeta com este nome'
                else throw error
            })

            const res = {
                planet: newPlanet,
                url: `${variables.url}/planets/${newPlanet._id}`,
                resource: `/planets`,
                methodAllowed: 'get, post',
            }

            return {..._STATUS, ...res }

        } catch (error) {
            error = await managePlanetErrors(error)
            return error
        }
    }

    const updatePlanet = async (planet, _id) => {
        try {
            let _STATUS = {code: 204}

            const filter = {
                _id
            }

            const planetChanged = await Planet.updateOne(filter, planet).catch(error => {
                    if(error.code === 11000) throw 'Já existe um planeta com este nome'
                    else throw error
            })

            const res = {
                planet: planetChanged,
                url: `${variables.url}/planets/${planetChanged._id}`,
                resource: `/planets/:id`,
                methodAllowed: 'get, put, delete',
            }

            return {..._STATUS, ... res}
        } catch (error) {
            error = await managePlanetErrors(error)
            return error
        }
    }

    const getFilms = async (planet) => {

        const name = planet.name
        
        const payload = {
            films: null,
            countFilms: 0
        }

        const options = {
            uri: `${variables.swapi}/planets?search=${name}`,
            json: true
        }

        await rp(options).then( response => {

            if(response.results && response.results.length === 1){
                payload.films = response.results[0].films
                payload.countFilms = response.results[0].films.length
            }

        })

        return {...planet, ...payload} 
    }
    return {get, getById, save, remove}
}