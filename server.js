const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json()); // For parsing application/json
app.use(cors()); // To handle CORS

const API_ENDPOINT = "https://api.siputzx.my.id/api/ai/naw"; // Your AI endpoint

// Endpoint for chatbot
app.get('/api/chat', async (req, res) => {
    const { text } = req.query; // Get text from query parameters

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    try {
        // Sending request to the AI API
        const response = await axios.get(API_ENDPOINT, {
            params: { content: text },
        });

        // Checking if the response is valid
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
