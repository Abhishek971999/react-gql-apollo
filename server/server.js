const express = require("express")
const expressGraphQL = require('express-graphql').graphqlHTTP
const cors = require( `cors` );
const schema = require("./schema/schema")

const app = express()
const PORT = process.env.PORT || 5000

//Allow all origin
app.use(cors())

//GQL Endpoint
app.use('/graphql',expressGraphQL({
    graphiql:true,
    schema
}))

//Listen to connection
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))