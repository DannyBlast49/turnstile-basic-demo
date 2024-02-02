export default async function handler(req, res) {
  console.log('Starting verifyCaptcha call');
  if (req.method === 'POST') {
    const token = req.body.token; // The Turnstile token submitted with the form
    const secretKey = process.env.NODE_ENV === 'production' ? process.env.TURNSTILE_SECRET_KEY : '1x0000000000000000000000000000000AA'; // Your Turnstile secret key stored in an environment variable

    // URL for the Turnstile verification API
    const verifyUrl = `https://challenges.cloudflare.com/turnstile/v0/siteverify?secret=${secretKey}&response=${token}`;

    try {
      const verificationResponse = await fetch(verifyUrl, {
        method: 'POST',
      });
      const verificationResult = await verificationResponse.json();

      if (verificationResult.success) {
        // Token is valid, proceed with your form handling
        res.status(200).json({ message: 'Captcha verification succeeded' });
      } else {
        // Token is invalid, handle accordingly
        res.status(400).json({ message: 'Captcha verification failed', errors: verificationResult['error-codes'] });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error during captcha verification', error });
    }
  } else {
    // Not a POST request
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}