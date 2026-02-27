const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { prompt } = JSON.parse(event.body || '{}');
  if (!prompt) {
    return {
      statusCode: 400,
      body: 'Missing prompt',
    };
  }

  // Use your OpenAI API key from Netlify environment variables
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: 'Missing OpenAI API key',
    };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 512,
      }),
    });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ result: data.choices?.[0]?.message?.content || '' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
