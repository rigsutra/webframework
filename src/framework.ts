import http, { IncomingMessage, ServerResponse } from "http";

type Handler = (req: IncomingMessage, res: ServerResponse) => void;

class Fastexpress {
  private routes: Map<string, Handler> = new Map();

  get(path: string , handler: Handler){
        const key = `GET:${path}`;
        this.routes.set(key , handler);
  }

  post(path: string , handler : Handler){
    const key = `POST:${path}`;
    this.routes.set(key , handler);
  }

  private matchRoutes(method : string , url: string){
    const key = `${method}:${url}`;
     return this.routes.get(key) || null ;
  }

  listen(port: number , callback?: ()=> void){
    const server = http.createServer((req , res) =>{
        const handler = this.matchRoutes(req.method! , req.url!);
        if(handler){
            handler(req, res);
        }else{
            res.writeHead(404 , {'Content-Type' : 'text/plain'});
            res.end('404 Not Found');
        }
    })

    server.listen(port,callback);
  }

}

export default Fastexpress;
