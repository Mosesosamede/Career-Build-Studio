export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiUrl =
    process.env.GET_CUSTOMER_API_URL ||
    "https://script.google.com/macros/s/AKfycbymCZ7pki-cuYRSDNh9QnOj2eXcq-be7-HI8U8R-45m4KD-Km7dYZXt-8Rl0WOrLFG1/exec";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
      redirect: "follow",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("External API Error:", errorText);
      return res.status(response.status).json({ error: "External API failed", details: errorText });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({ error: "Failed to submit form" });
  }
}
