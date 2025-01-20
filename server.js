const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json()); // Untuk parsing JSON
app.use(cors()); // Untuk CORS

const API_ENDPOINT = "https://api.siputzx.my.id/api/ai/naw"; // Sesuaikan dengan endpoint AI Anda

// Endpoint API chatbot
app.post('/api/chat', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    try {
        // Mengirimkan request ke API eksternal untuk mendapatkan jawaban
        const response = await axios.get(API_ENDPOINT, {
            params: { content: text },
        });

        // Mengecek jika API eksternal memberikan response yang valid
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
