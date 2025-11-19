import axios from 'axios';

export async function sendToJasper(messages, systemPrompt) {
  const res = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
    model: "google/gemini-2.0-flash-exp",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.slice(-15)
    ],
    temperature: 0.8,
    max_tokens: 1200
  }, {
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
      "HTTP-Referer": window.location.origin,
      "X-Title": "JASPER AI"
    }
  });

  return res.data.choices[0].message.content;
}
