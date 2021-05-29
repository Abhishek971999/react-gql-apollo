const graphql = require("graphql")
const axios = require("axios")
const {GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLSchema,GraphQLList,GraphQLNonNull} = graphql

//UserType
const UserType = new GraphQLObjectType({
    name:"User",
    //Fields available on user
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
    })
})

//RootQuery
const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:()=>({
        //Get all users
        users:{
            type:GraphQLList(UserType),
            resolve(parentVal,args){
                return axios.get(`http://localhost:9999/users/`)
                .then(res=>res.data)
            }
        },
        //Get single user
        user:{
            type:UserType,
            args:{id:{type:GraphQLString}},
            resolve(parentVal,args){
                return axios.get(`http://localhost:9999/users/${args?.id}`)
                .then(res=>res.data)
            }
        }
    })
})

//Mutation
const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        //Add User Mutation
        addUser:{
            type:UserType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                companyId:{type:GraphQLString},
                age:{type:GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentVal,{name,age}){
                return axios.post(`http://localhost:9999/users`,{name,age})
                .then(res=>res.data)
            }
        },
        //Delete User Mutation
        deleteUser:{
            type:UserType,
            args:{id:{type:GraphQLString}},
            resolve(parentVal,{id}){
                return axios.delete(`http://localhost:9999/users/${id}`)
                .then(res=>res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:mutation
})