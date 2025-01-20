const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json()); // For parsing application/json
app.use(cors()); // To handle CORS

const API_ENDPOINT = "https://api.siputzx.my.id/api/ai/naw"; // Your AI endpoint

// Endpoint for chatbot
app.get('/api/chat', async (req, res) => {
    const { text } = req.query; // Mengambil teks dari query parameter

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    try {
        const response = await axios.get(API_ENDPOINT, {
            params: { content: text },
        });

        if (response.data && response.data.status) {
            return res.json({ chatResponse: response.data.data.chatResponse });
        } else {
            return res.status(500).json({ error: 'Error from the AI API' });
        }
    } catch (error) {
        console.error('Error fetching from AI API:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
});
// Server listening on port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
