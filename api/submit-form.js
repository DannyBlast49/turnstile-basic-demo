export default async function handler(req, res) {
  console.log('This is running');
  console.log(req.body);
  const token = req.body['cf-turnstile-response'];
  const idempotencyKey = req.body['idempotency-key'];

  let formData = new FormData();
	formData.append('secret', process.env.TURNSTILE_SECRET_KEY);
	formData.append('response', token);
  formData.append('idempotency_key', req.connection.remoteAddress);

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    const outcome = await response.json();
    if (outcome.success) {
      res.send({ verified: true, message: 'Captcha verification successful', data: outcome });
    } else {
      res.send({ verified: false, error: 'Captcha verification failed', data: outcome });
    }
  } catch (error) {
    res.status(500).send({ error: 'Server error verifying captcha' });
  }
}