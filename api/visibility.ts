export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiUrl = process.env.VISIBILITY_API_URL;
  
  if (!apiUrl) {
    console.error("VISIBILITY_API_URL is not set");
    return res.status(500).json({ error: "API configuration missing" });
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
      redirect: "follow",
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Visibility submission error:", error);
    res.status(500).json({ error: "Failed to submit form" });
  }
}
