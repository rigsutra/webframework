import http from "http";
import { Router, Handler } from "./router";
import { Middleware } from "./types";

class Fastexpress {
  private route = new Router();
  private middlewares: Middleware[] = [];

  get(path: string, ...handler: (Handler | Middleware)[]) {
    this.route.addRoute("GET", path, ...handler);
  }

  post(path: string, ...handler: (Handler | Middleware)[]) {
    this.route.addRoute("POST", path, ...handler);
  }

  put(path: string, ...handler: (Handler | Middleware)[]) {
    this.route.addRoute("PUT", path, ...handler);
  }

  delete(path: string, ...handler: (Handler | Middleware)[]) {
    this.route.addRoute("DELETE", path, ...handler);
  }

  patch(path: string, ...handler: (Handler | Middleware)[]) {
    this.route.addRoute("PATCH", path, ...handler);
  }

  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  private executeMiddlewares(req: any, res: any, finalHandlers: () => void) {
    let index = 0;
    const next = () => {
      if (index >= this.middlewares.length) {
        return finalHandlers();
      }
      const middleware = this.middlewares[index++];
      middleware(req, res, next);
    };
    next();
  }

  listen(port: number, callback?: () => void) {
    const server = http.createServer((req, res) => {
      this.executeMiddlewares(req, res, () => {
        const match = this.route.match(req.method!, req.url!);
        if (match) {
          req.params = match.params;
          const routeMiddlewares = match.middleware || [];
          let middlewareIndex = 0;
          const next = () => {
            if (middlewareIndex >= routeMiddlewares.length) {
             return match.handler(req, res);
            }
            const middleware = routeMiddlewares[middlewareIndex++];
            middleware(req, res, next);
          };
          next();
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not Found");
        }
      });
    });

    server.listen(port, callback);
  }
}

export default Fastexpress;
