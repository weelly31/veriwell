const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  const { prompt } = JSON.parse(event.body || '{}');
  if (!prompt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing prompt' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  // Use your OpenAI API key from Netlify environment variables
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing OpenAI API key' }),
      headers: { 'Content-Type': 'application/json' },
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
    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `OpenAI error: ${errorText}` }),
        headers: { 'Content-Type': 'application/json' },
      };
    }
    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;
    if (!aiResponse) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'No response from OpenAI.' }),
        headers: { 'Content-Type': 'application/json' },
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ result: aiResponse }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
