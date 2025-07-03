export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  const { url } = req.body;

  const response = await fetch('https://linkshortify.com/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      domain: "linkshortify.com",
      api: "5a29931787e04de46acfc9d8c2e81bfca2d9a5a0"
    }),
  });

  const data = await response.json();

  return res.status(200).json(data);
}
