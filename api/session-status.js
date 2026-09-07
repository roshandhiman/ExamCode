// Vercel Serverless Function: Active Session Status & Invalidation Check
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { token } = req.query || {};
  let valid = false;

  if (token) {
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
      if (decoded.v === 'v4' && (Date.now() - decoded.t < 7 * 24 * 60 * 60 * 1000)) {
        valid = true;
      }
    } catch (e) {}
  }

  return res.status(200).json({
    epoch: 'v4',
    valid,
    serverTime: Date.now()
  });
}
