import { IncomingMessage, ServerResponse } from "http";
import { Middleware } from "./types";

declare module "http" {
  interface IncomingMessage {
    params: Record<string, string>;
    user?: { id: number; name: string };
  }
}

export type Handler = (req: IncomingMessage, res: ServerResponse) => void;

interface Route {
  method: string;
  pattern: RegExp;
  paramNames: string[];
  middleware?: Middleware[];
  handler: Handler;
}

export class Router {
  private routes: Route[] = [];

  addRoute(method: string, path: string, ...handler: (Handler | Middleware)[]) {
    if (handler.length === 0) {
      throw new Error("At least one handler is required");
    }

    const middleware = handler.slice(0, -1) as Middleware[];
    const handlers = handler[handler.length - 1] as Handler;

    const paramNames: string[] = [];
    const pattern = path.replace(/:(\w+)/g, (_, paramName) => {
      paramNames.push(paramName);
      return "([^/]+)";
    });
    this.routes.push({
      method,
      paramNames,
      handler: handlers,
      middleware: middleware.length > 0 ? middleware : undefined,
      pattern: new RegExp(`^${pattern}$`),
    });
  }

  match(method: string, url: string): { handler: Handler; params: any ; middleware?: Middleware[] } | null {
    for (const route of this.routes) {
      if (route.method !== method) continue;

      const match = url.match(route.pattern);
      if (match) {
        const params: any = {};
        route.paramNames.forEach((name, i) => {
          params[name] = match[i + 1];
        });
        return { handler: route.handler, params, middleware: route.middleware || [] };
      }
    }
    return null;
  }
}
