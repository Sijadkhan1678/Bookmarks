 require("dotenv").config()

 const { ApolloServer, gql } = require("apollo-server-lambda")

 const { Client, query } = require('faunadb');

 const client = new Client({
  secret: process.env.SERVER_SECRET,
 })


   const typeDefs = `

   type Query {
     bookmarks: [Bookmark]
  }

  type Bookmark {

       id: ID!
       title: String!
       description: String!
       url: String!
     }

   type Mutation {
        addBookmark (title:String!,description:String,url:String!): Bookmark

        updateBookmark (id:ID!,title:String,description:String,url:String):Bookmark

        deleteBookmark (id:ID!):Bookmark
  }`


 const resolvers = {
   Query: {
     bookmarks: async () => {
      try {
        
        const result = await client.query(query.Map(query.Paginate(query.Documents(query.Collection("Bookmarks"))),
          query.Lambda(x => query.Get(x))
        )
        )
        
        console.log('get bookmarks', result.data[0])
        
        const  bookmarks = result.data.map( bookmark =>({
          id: bookmark.ref.id,
          title: bookmark.data.title,
          description: bookmark.data.description,
          url: bookmark.data.url
        }
        ))
        
        return bookmarks
        
      } catch (error) {
        console.log(error)
        return error.toString()
      }
    },
  },

  Mutation: {
    addBookmark: async (_, args) => {

      try {

        const res = await client.query(query.Create(query.Collection('Bookmarks'), { data: args }));
        
        console.log('added bookmark',res.ref.id)
        
        return {
          id: res.ref.id,
          title: res.data.title,
          description: res.data.description,
          url: res.data.url
        }
        
      } catch(error) {
        console.log('server error', error)
        return error.toString()
      }
    },

    updateBookmark: async (_, { id, title, description, url
     }) => {

      try {

        const bookmark = {
          title,
          description,
          url
        }

        const res = await client.query(query.Update(query.Ref(query.Collection('Bookmarks'), id), {
          data: bookmark
        }))

        console.log('successfully bookmark Updated', res)

        return {
          id: res.ref.id,
          title: res.data.title,
          description: res.data.description,
          url: res.data.url
        }
      } catch(error) {
        console.log('server error', error)
        return error.toString()
      }
    },


    deleteBookmark: async (_, { id }) => {

      try {

        const res = await client.query(query.Delete(query.Ref(query.Collection('Bookmarks'), id)))

        console.log('successfully Bookmark deleted', res.data)
        return {
          title: res.data.title,
          description: res.data.description,
          url: res.data.url
        }
      } catch(error) {
        console.log('server error', error);
        return error.toString()
      }
    },

  }
}

   const server = new ApolloServer({
     typeDefs,
     resolvers,
  });


  
  const handler = server.createHandler()

  module.exports = { handler }
