const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3001; // Make sure this port is different from your React app's port

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.post('/submit-form', async (req, res) => {
  console.log('This is running');
  console.log(req.body['cf-turnstile-response']);
  const token = body.get('cf-turnstile-response');
  try {
    const response = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', {}, {
      params: {
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      },
    });
    if (response.data.success) {
      res.send({ verified: true, message: 'Captcha verification successful' });
    } else {
      res.send({ verified: false, error: 'Captcha verification failed' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Server error verifying captcha' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});