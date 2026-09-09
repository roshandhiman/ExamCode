// Vercel Serverless Function: Secure Logout
export default async function handler(req, res) {
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.setHeader('Set-Cookie', 'examcode_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
}
