const bodyParser = require('body-parser')
const cors = require('cors')

// const options = {
    /*  Configurações de acesso aos middlewares via cors
        Saiba mais em: https://www.npmjs.com/package/cors

        Ao omitir este valor no parametro da função cors será permitido
        Acesso de qualquer origin
    */
    // origin: 'http://localhost:3000'
// }

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())

}