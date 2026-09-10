// Server-Side Visitor & Login Tracking Endpoint
// 100% Private: Plain webhook URL is NEVER exposed to the frontend or network tab inspectors.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) {}
    }

    const {
      event = 'visit',
      visitorId = 'anon',
      screen = '',
      referrer = ''
    } = body || {};

    // Capture real client IP and geolocation headers from Vercel edge
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0].trim() : (req.socket.remoteAddress || '127.0.0.1');
    const city = req.headers['x-vercel-ip-city'] || 'Unknown City';
    const country = req.headers['x-vercel-ip-country'] || 'IN';
    const userAgent = req.headers['user-agent'] || 'Unknown Device';

    // Format IST Timestamp (Indian Standard Time)
    const istTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium'
    });

    const payload = {
      timestamp: istTime,
      event: event.toUpperCase(),
      ip,
      location: `${city}, ${country}`,
      device: userAgent,
      screen,
      visitorId,
      referrer
    };

    // Google Apps Script Webhook URL (configured in env or fallback)
    const webhookUrl = process.env.GOOGLE_LOG_WEBHOOK_URL || 
      process.env.DOCS_WEBHOOK_URL || 
      'https://script.google.com/macros/s/AKfycbzzt0Eo4SJxmsjOW5mbGm8jCNbrPrYZME6Lwg01_H6hZ7jgNMYRXYbG2M796ZWXJMPv6Q/exec';

    if (webhookUrl && webhookUrl.startsWith('http')) {
      // Fire-and-forget to Google Sheets / Docs webhook
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => {
        console.error('Failed to forward log to Google Webhook:', err.message);
      });
    } else {
      // Log to server console if webhook URL not yet configured
      console.log('[VISITOR LOG]', JSON.stringify(payload));
    }

    return res.status(200).json({ success: true, logged: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
