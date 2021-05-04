import axios from 'axios'

export default async (req, res) => {
  if (req.method == 'POST') {
    const client = axios.create({
      baseURL: 'https://api.mailerlite.com/api/v2/',
      headers: {
        'Content-type': 'application/json',
        'X-MailerLite-ApiKey': process.env.MAILERLITE_KEY
      }
    })
  
    const { data: subscribers } = await client.get('subscribers', {})
    const emails = subscribers.map(subscriber => subscriber.email)
    
    if (emails.includes(req.body.email)) {
      res.end()
      return;
    }
  
    try {
      await client.post('subscribers', {
        email: req.body.email
      })
      res.end()
    } catch (err) {
      res.send(err)
    }
  } else {
    res.status(404).end()
  }
}