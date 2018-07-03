import express from 'express';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';
import schema from './graphql';

const app = express();
const port = 3000;

mongoose.connect('mongodb://evincent:test123@ds125871.mlab.com:25871/graphql-api');
const db = mongoose.connection;
db.on('error', () => console.log('Failed to connect to database'))
  .once('open', () => console.log('Connected to database'));

app.get('/', (req, res) => {
  res.send('Hello World. This is a GraphQL API.');
});

// GraphQL API endpoint

app.use('/graphql', graphqlHTTP(() => ({
  schema,
  graphiql: true,
  pretty: true
})));

app.listen(port, () => {
  console.log('GraphQL API Running at port: ', port);
});