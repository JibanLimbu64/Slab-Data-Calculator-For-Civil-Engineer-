const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration of explicitly allowed CORS channels
app.use(cors({
    origin: '*', // For production, restrict this to your actual frontend domain
    methods: ['POST', 'GET', 'OPTIONS']
}));
app.use(express.json());

// Strict Structural Object Mapping validation via Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Inquiry', contactSchema);

// Connection Engine String with verification fallbacks
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aether_db';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Successfully connected to MONGODB database instance.'))
    .catch(err => console.error('CRITICAL database connection interruption:', err));

// Secure API endpoint interface mapping
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, service, message } = req.body;
        
        if (!name || !email || !service || !message) {
            return res.status(400).json({ status: "Error", message: "Incomplete target payload structures." });
        }

        const cleanInquiry = new Contact({ name, email, service, message });
        await cleanInquiry.save();

        return res.status(201).json({ status: "Success", message: "Node successfully updated." });
    } catch (error) {
        console.error('Server Internal Route Failure Processing Payload:', error);
        return res.status(500).json({ status: "Error", message: "System core parsing error execution." });
    }
});

app.listen(PORT, () => console.log(`AETHER Engine Processing live on port: ${PORT}`));