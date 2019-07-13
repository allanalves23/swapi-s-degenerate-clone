const app = require('express')()
const mongoose = require('mongoose')
const consign = require('consign')


app.mongoose = mongoose

consign()
.include('./config/db.js')
.then('./config/middlewares.js')
.then('./config/validation.js')
.then('./config/mongooseSchemas.js')
.then('./config/errorManagement.js')
.then('./config/variables.js')
.then('./api')
.then('./config/routes.js')
.into(app)

const port = process.env.SWAPIPORT || 3000

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})