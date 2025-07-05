const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

dotenv.config();
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/generate-tip', async (req, res) => {
  try {
    const userMood = req.body.mood || 'Send a sweet hair care reminder.';
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `${userMood} Keep it cute and positive. Limit to 1 sentence.`
        }
      ],
      max_tokens: 50,
      temperature: 0.8
    });
    const tip = response.choices[0].message.content;
    res.json({ tip });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI tip generation failed.' });
  }
});

app.listen(port, () => {
  console.log(`HairFall Tracker running on http://localhost:${port}`);
});