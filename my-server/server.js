const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;

// PostgreSQL pool configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors({
  origin: 'http://localhost:3001' // Replace with the URL of your frontend app
}));
app.use(bodyParser.json());

// Registration endpoint
app.post('/register', async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const result = await pool.query(
      'INSERT INTO users (userName, email, password) VALUES ($1, $2, $3) RETURNING id',
      [userName, email, hashedPassword]
    );

    // Respond with the ID of the new user
    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  console.log('DB Password:', process.env.DB_PASSWORD);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
