// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/test-management', { useNewUrlParser: true, useUnifiedTopology: true });

const RequirementSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: String,
  tags: [String],
});

const Requirement = mongoose.model('Requirement', RequirementSchema);

app.post('/api/requirements', async (req, res) => {
  const { title, description, priority, tags } = req.body;
  const newRequirement = new Requirement({ title, description, priority, tags });
  try {
    await newRequirement.save();
    res.status(201).send('Requirement saved successfully');
  } catch (error) {
    res.status(500).send('Error saving requirement');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
