export function logger(req: any, res: any, next: () => void) {
  const start = Date.now();
  console.log(`→ ${req.method} ${req.url}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`← ${req.method} ${req.url} ${res.statusCode} (${duration}ms)`);
  });

  next();
}

export function authenticate(req: any, res: any, next: () => void) {
  const token = req.headers.authorization;
  
  if (!token) {
    res.writeHead(401, { 'Content-Type': 'text/plain' });
    res.end('Unauthorized - No token provided');
    return;
  }
  
  req.user = { id: 1, name: 'ashish' };
  next();
}