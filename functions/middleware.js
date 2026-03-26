export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // 1. Only protect the dashboard and API routes
  // This allows your public landing page to stay public.
  if (!url.pathname.startsWith('/dashboard') && !url.pathname.startsWith('/api')) {
    return context.next();
  }

  // 2. Check for the Authorization header
  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response('Authentication Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="NTC Admin Dashboard"',
      },
    });
  }

  // 3. Decode and verify credentials
  // Format: "Basic <base64(username:password)>"
  const [scheme, encoded] = authHeader.split(' ');
  if (scheme !== 'Basic' || !encoded) {
    return new Response('Invalid Authentication', { status: 400 });
  }

  const decoded = atob(encoded);
  const [username, password] = decoded.split(':');

  // 4. Compare with your Environment Variables
  // You will set these in the Cloudflare Dashboard
  if (username === env.ADMIN_USER && password === env.ADMIN_PASS) {
    return context.next();
  }

  // 5. If credentials fail
  return new Response('Invalid Credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="NTC Admin Dashboard"',
    },
  });
}
