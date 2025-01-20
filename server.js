const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // For parsing application/json

const API_ENDPOINT = "https://api.siputzx.my.id/api/ai/naw";

app.post('/api/chatbot', async (req, res) => {
    const { text } = req.body;

    // Validasi apakah teks ada
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    try {
        // Mengirim request ke API
        const response = await axios.get(API_ENDPOINT, {
            params: { content: text },
        });

        // Mengecek apakah response memiliki data yang benar
        if (response.data && response.data.status) {
            res.json({ chatResponse: response.data.data.chatResponse });
        } else {
            // Jika API tidak mengirimkan data yang valid
            res.status(500).json({ error: 'Error from the AI API' });
        }
    } catch (error) {
        // Logging error yang lebih lengkap
        console.error('Error fetching from AI API:', error);

        // Menangani error dari API jika ada response error
        if (error.response) {
            console.error('API Error Response:', error.response.data);
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            // Menangani error jika terjadi masalah jaringan atau error lain
            console.error('Unexpected error:', error.message);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
