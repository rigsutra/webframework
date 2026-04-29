import Fastexpress from "../src/framework";

const app = new Fastexpress();

app.get('/' , (req , res ) => {
    res.writeHead(200 , {'Content-Type' : 'text/plain'});
    res.end('Hello this is Fastexpress');
});

app.get('/about' , (req , res) => {
    res.writeHead(200 , {'Content-Type' : 'text/plain'});
    res.end('About Page');
})

app.get('/contact', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Contact Page');
});

app.listen(3000 , ()=>{
    console.log("Server is running at port 3000")
})