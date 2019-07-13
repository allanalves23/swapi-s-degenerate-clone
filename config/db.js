const mongoose = require('mongoose')

//Configuração de referencias de conexão com o banco de dados
const {dbLocal, dbProduction} = require('../.env')

const url = dbLocal.url

/* Realiza a conexão com o banco do mongoDB */
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true})
    .catch(e => {
        const msg = 'Error: Connection in database failed, make sure your database is online'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })