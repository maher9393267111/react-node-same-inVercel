// const express = require("express");
// const app = express();

// const logger = require("morgan");
// const cors = require("cors");

// const { ApolloServer } = require('apollo-server-express');
// const path = require('path');
// const { authMiddleware } = require('./api/utils/auth');

// const { typeDefs, resolvers } = require('./api/schemas');
// const db = require('./api/config/connection');

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware,
// });





// app.get("/api/test", (req, res) => {
//   res.send("my name is mahe how are you main");
// });





// app.use(express.static(path.join(__dirname, "./frontend/build")));

// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./frontend/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });








//  const port = process.env.PORT || 5000;
// // app.listen(port, () => console.log(`Server Running on port ${port}`));

// // module.exports = app;



// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// // Create a new instance of an Apollo server with the GraphQL schema
// const startApolloServer = async (typeDefs, resolvers) => {
//   await server.start();
//   server.applyMiddleware({ app });
  

//   db.once('open', () => {
//     app.listen(port, () => {
//       console.log(`API server running on port ${port}!`);
//       console.log(`Use GraphQL at http://localhost:${port}${server.graphqlPath}`);
//     })
//   })
//   };
  
// // Call the async function to start the server
//   startApolloServer(typeDefs, resolvers);


//------------------------------

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./api/utils/auth');

const { typeDefs, resolvers } = require('./api/schemas');
const db = require('./api/config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);