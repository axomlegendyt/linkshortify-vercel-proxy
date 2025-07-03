export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing "url" in request body' });
  }

  try {
    const response = await fetch(`https://api.shareus.io/easy_api?key=ZxhpVXCSgwXQZuYlxSByEh9U8yy1&link=${encodeURIComponent(url)}`);
    const shortUrl = await response.text(); // Because Shareus returns plain text

    res.status(200).json({ shortUrl });
  } catch (err) {
    res.status(500).json({ error: 'Shortening failed', details: err.message });
  }
}
