const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/resume_database'; // Default for local development

app.use(cors());
app.use(express.json());

let db;

async function connectMongo() {
  try {
    const client = await MongoClient.connect(mongoUri);
    db = client.db();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectMongo();

app.get('/api/resume-data', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database connection not established.' });
    }
    const resumeData = await db.collection('resume_data').find().toArray();
    res.json(resumeData);
  } catch (error) {
    console.error('Error fetching resume data:', error);
    res.status(500).json({ error: 'Failed to fetch resume data.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});