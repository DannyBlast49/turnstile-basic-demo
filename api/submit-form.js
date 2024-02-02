export default async function handler(req, res) {
  console.log('This is running');
  console.log(req.body['cf-turnstile-response']);
  console.log(req.headers);
  console.log(req.headers['cf-connecting-ip']);
  console.log(req.headers['CF-Connecting-IP']);
  const token = req.body['cf-turnstile-response'];

  let formData = new FormData();
	formData.append('secret', process.env.TURNSTILE_SECRET_KEY);
	formData.append('response', token);

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    const outcome = await response.json();
    if (outcome.success) {
      res.send({ verified: true });
      res.send({ message: 'Captcha verification successful' });
    } else {
      res.send({ verified: false });
      res.send({ error: 'Captcha verification failed' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Server error verifying captcha' });
  }
}