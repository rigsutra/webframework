import Fastexpress from "../src/framework";
import { logger ,authenticate } from '../src/middleware';
import { IncomingMessage , ServerResponse } from "http";

const app = new Fastexpress();
app.use(logger);

// Step 1: Define routes

app.get('/' , (_req : IncomingMessage , res : ServerResponse ) => {
    res.writeHead(200 , {'Content-Type' : 'text/plain'});
    res.end('Hello this is Fastexpress');
});

app.get('/about' , authenticate ,(_req : IncomingMessage, res : ServerResponse) => {
    res.writeHead(200 , {'Content-Type' : 'text/plain'});
    res.end('About Page');
})

app.get('/contact', (_req : IncomingMessage, res : ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Contact Page');
});

app.get('/users/:id', (req : IncomingMessage, res : ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`User ID: ${req.params.id}`);
});

app.get('/posts/:postId/comments/:commentId', (req : IncomingMessage, res : ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Post: ${req.params.postId}, Comment: ${req.params.commentId}`);
});

app.get('/profile', authenticate, (req : IncomingMessage, res : ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Hello ${req.user!.name}!`);
});

app.put('/users/:id', (req : IncomingMessage, res : ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Updated User ID: ${req.params.id}`);
});

app.delete('/users/:id', (req : IncomingMessage, res : ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Deleted User ID: ${req.params.id}`);
});

app.listen(3000 , ()=>{
    console.log("Server is running at port 3000")
})