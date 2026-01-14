const config = require('config.json');
const Api_Key = config.Api_Key; // ✅ Make sure key name matches exactly

module.exports = {
    chatWithGemini
};

async function chatWithGemini(userMessage) {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${Api_Key}`;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: userMessage }]
            }]
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to connect to Gemini');
    }

    return data.candidates[0].content.parts[0].text;
}