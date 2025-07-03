export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  const { url, domain, api } = req.body;

  if (!url || !domain || !api) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch(`https://${domain}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        api: api,
      }),
    });

    const data = await response.json();

    if (data.shortenedUrl) {
      return res.status(200).json({ shortenedUrl: data.shortenedUrl });
    } else {
      return res.status(500).json({ error: 'Shortening failed', data });
    }

  } catch (err) {
    return res.status(500).json({ error: 'Server Error', details: err.message });
  }
}
