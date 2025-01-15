const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')('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'); // Replace with your secret key

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to generate connection token
app.post('/connection_token', async (req, res) => {
    try {
        const token = await stripe.terminal.connectionTokens.create();
        res.json({ connection_token: token.secret });
    } catch (error) {
        console.error('Error generating connection token:', error);
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Stripe Terminal Backend is running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
