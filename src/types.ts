export type Middleware = (req: any, res: any, next: () => void) => void;
