require("dotenv").config()

const { Client, query } = require('faunadb');

const client = new Client({ secret: process.env.SERVER_SECRET })

const { ApolloServer, gql } = require('apollo-server-lambda')

const typeDefs = gql`

type Query {
  
   todos: [Todo]
}

type Todo {
  id: ID!
  title: String!
  status: Boolean!
}

type Mutation {
addTodo (title:String,status:Boolean): Todo

updateTodo (id:ID!,title:String,status:Boolean):Todo

deleteTodo (id:ID):Todo
}
`


const resolvers = {
  Query: {
    todos: async () => {
      try {

        const result = await client.query(query.Map(query.Paginate(query.Documents(query.Collection("todos"))),
          query.Lambda(x => query.Get(x))
        )
        )

        console.log('get books', result.data[0])

        const todos = result.data.map(todo => ({
          id: todo.ref.id,
          title: todo.data.title,
          status: todo.data.status
        }
        ))

        return todos

      } catch (error) {
        console.log(error)
        return error.toString()
      }
    },
  },

  Mutation: {
    addTodo: async (_, args) => {

      try {

        const res = await client.query(query.Create(query.Collection('todos'), { data: args }));

        console.log('successfully added Todo', res.data)

        return {
          id: res.ref.id,
          title: res.data.title,
          status: res.data.status
        }

      } catch (error) {
        console.log('server error', error)
        return error.toString()
      }
    },

    updateTodo: async (_, { id, title, status
    }) => {
      console.log('title', title)
      try {

        const todo = {
          title,
          status
        }

        const res = await client.query(query.Update(query.Ref(query.Collection('todos'), id), {
          data: todo
        }))

        console.log('successfully Todo Updated', res)

        return {
          id: res.ref.id,
          title: res.data.title,
          status: res.data.status
        }
      } catch (error) {
        console.log('server error', error)
        return error.toString()
      }
    },


    deleteTodo: async (_, { id }) => {

      try {

        const res = await client.query(query.Delete(query.Ref(query.Collection('todos'), id)))

        console.log('successfully Todo deleted', res.data)
        return {
          title: res.data.title,
          status: res.data.status
        }
      } catch (error) {
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

