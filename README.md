# FastExpress

A minimal Express-like web framework built from scratch in TypeScript. This project is designed for learning how web frameworks work under the hood.

## 🚀 Features

- **Lightweight HTTP server** built on Node.js `http` module
- **Route handling** with support for GET and POST methods
- **Dynamic route parameters** (e.g., `/users/:id`, `/posts/:postId/comments/:commentId`)
- **Middleware support** with next() pattern
- **Built-in middleware**:
  - Logger (logs requests with response time)
  - Authentication (token-based auth)
- **TypeScript** with full type definitions

## 📦 Installation

```bash
npm install
```

## 📖 Usage

### Basic Example

```typescript
import Fastexpress from './src/framework';

const app = new Fastexpress();

// Define routes
app.get('/', (_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from FastExpress!');
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### Using Middleware

```typescript
import Fastexpress from './src/framework';
import { logger, authenticate } from './src/middleware';

const app = new Fastexpress();

// Apply middleware
app.use(logger);

// Public route
app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome!');
});

// Protected route (requires authentication)
app.use(authenticate);
app.get('/profile', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Hello ${req.user!.name}!`);
});

app.listen(3000);
```

### Route Parameters

```typescript
// Single parameter
app.get('/users/:id', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`User ID: ${req.params.id}`);
});

// Multiple parameters
app.get('/posts/:postId/comments/:commentId', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Post: ${req.params.postId}, Comment: ${req.params.commentId}`);
});
```

### POST Requests

```typescript
app.post('/api/data', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('POST request received');
});
```

## 📁 Project Structure

```
fastexpress/
├── src/
│   ├── framework.ts      # Main Fastexpress class
│   ├── router.ts         # Router with route matching
│   └── middleware.ts     # Built-in middleware (logger, auth)
├── examples/
│   └── app.ts           # Example usage
├── dist/                # Compiled JavaScript (generated)
├── package.json
└── tsconfig.json
```

## 🛠️ Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run the compiled application |

## 📚 How It Works

### Framework (`framework.ts`)
- Creates an HTTP server using Node's `http.createServer`
- Manages middleware chain execution
- Routes requests to the appropriate handler

### Router (`router.ts`)
- Stores routes with their HTTP methods and handlers
- Converts route patterns (e.g., `/users/:id`) to regular expressions
- Extracts parameters from URLs during matching

### Middleware (`middleware.ts`)
- **Logger**: Logs incoming requests and response times
- **Authenticate**: Checks for authorization header and attaches user to request

## 🔮 Future Enhancements

- [ ] Add more HTTP methods (PUT, DELETE, PATCH, etc.)
- [ ] Request body parsing (JSON, form data)
- [ ] Response helper methods (`res.json()`, `res.send()`)
- [ ] Error handling middleware
- [ ] Static file serving
- [ ] Template engine support

## 📄 License

MIT

## 👤 Author

**Ashish Singh**

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome!

---

Built for learning how Express and similar frameworks work internally.
