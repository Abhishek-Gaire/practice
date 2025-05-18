import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';

// Define the schema
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
  }
  
  type HealthStatus {
    status: String!
    timestamp: String!
  }
  
  type Query {
    hello: String
    getUser(id: ID!): User
    listUsers: [User]
    health: HealthStatus
  }
  
  type Mutation {
    setMessage(message: String): String
    createUser(name: String!, email: String!): User
  }
`);

// Resolvers
const root = {
  hello: () => 'Hello, GraphQL with TypeScript!',
  getUser: ({ id }:{id:string}) => ({ id, name: `User ${id}`, email: `user${id}@example.com` }),
  listUsers: () => [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
  ],
  health: () => ({ status: 'healthy', timestamp: new Date().toISOString() }),
  setMessage: ({ message }:{message:string}) => `Message set to: ${message}`,
  createUser: ({ name, email }:{name:string,email:string}) => ({ id: Math.random().toString(36).substr(2, 9), name, email }),
};

// Initialize Express app
const app = express();

// Apply JSON middleware globally
app.use(express.json());

// Serve GraphQL UI
const graphiqlHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>GraphQL</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/graphiql/2.4.0/graphiql.min.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/graphiql/2.4.0/graphiql.min.js"></script>
  <style>
    body { height: 100vh; margin: 0; }
    #graphiql { height: 100vh; }
  </style>
</head>
<body>
  <div id="graphiql"></div>
  <script>
    const fetcher = params => {
      return fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      }).then(res => res.json());
    };
    
    ReactDOM.render(
      React.createElement(GraphiQL, { fetcher }),
      document.getElementById('graphiql')
    );
  </script>
</body>
</html>
`;

// Serve GraphQL UI at root and /graphiql
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(graphiqlHtml);
});

app.get('/graphiql', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(graphiqlHtml);
});

// GraphQL endpoint using graphql-http
app.all('/graphql', createHandler({
  schema: schema,
  rootValue: root,
}));

// Additional REST routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/users', (req, res) => {
  res.json([
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
  ]);
});

app.post('/api/message', (req, res) => {
  const { message } = req.body;
  res.json({ message: `Received: ${message}` });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  console.log(`GraphQL UI: http://localhost:${PORT}/graphiql`);
  console.log(`API endpoints:`);
  console.log(`  - http://localhost:${PORT}/api/health`);
  console.log(`  - http://localhost:${PORT}/api/users`);
  console.log(`  - http://localhost:${PORT}/api/message (POST)`);
});