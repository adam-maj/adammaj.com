const axios = require('axios')

export default async (req, res) => {
  const client = axios.create({
    baseURL: 'https://api.mailerlite.com/api/v2/',
    headers: {
      'Content-type': 'application/json',
      'X-MailerLite-ApiKey': '280eaae758a7e28f1bf484a3891ce188'
    }
  })

  const { data: subscribers } = await client.get('subscribers', {})
  const emails = subscribers.map(subscriber => subscriber.email)

  res.end()
  /*
  if (emails.includes(req.body.email)) {
    res.end()
    return;
  }

  await client.post('subscribers', {
    email: req.body.email
  })
  */
}