const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors()); 
app.use(express.json());
const API_ENDPOINT = "https://api.siputzx.my.id/api/ai/naw";
app.post('/api/chatbot', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    try {
        const response = await axios.get(API_ENDPOINT, {
            params: { content: text },
        });

        if (response.data && response.data.status) {
            res.json({ chatResponse: response.data.data.chatResponse });
        } else {
            res.status(500).json({ error: 'Error from the AI API' });
        }
    } catch (error) {
        console.error('Error fetching from AI API:', error.message);
        if (error.response && error.response.status) {
            res.status(error.response.status).json({error: error.message})
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
