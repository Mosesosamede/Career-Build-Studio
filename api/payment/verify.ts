export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { transactionId, expectedAmount, expectedCurrency } = req.body;

  try {
    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    const verified =
      data.data?.status === 'successful' &&
      data.data?.amount >= (expectedAmount || 0) &&
      data.data?.currency === (expectedCurrency || 'NGN');

    res.status(200).json({ verified, data: data.data });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
}
