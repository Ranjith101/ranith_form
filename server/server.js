const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3001;
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(cors());
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ra_users'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

// Function to get user by username
function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT user_id, username, password FROM users WHERE username = ?',
      [username],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          const user = results[0];
          resolve(user);
        }
      }
    );
  });
}
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Fetch the user's plain text password and user_id from the database based on the username
    const user = await getUserByUsername(username);

    if (user && user.password === password) {
      // Generate a randomly generated secret key
      const secretKey = 'r6p2L9a5K8c1F3g7Y0z4Q1b5E2h6X9w3';

      // Generate a JWT token
      const token = jwt.sign({ user_id: user.user_id, username }, secretKey, { expiresIn: '1h' });

      res.json({
        token, message: 'Login successful',
        user: { userId: user.user_id, username: user.username }
      });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

app.post('/register', (req, res) => {
  const { username, password, email, mobile } = req.body;

  // Here, you would typically insert the new user data into your database
  // For demonstration purposes, let's assume you have a users table with additional columns
  db.query(
    'INSERT INTO users (username, password, email, mobile) VALUES (?, ?, ?, ?)',
    [username, password, email, mobile], // Replace hashedPassword with your actual hashing function
    (error, results) => {
      if (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'An error occurred during registration.' });
      } else {
        const userId = results.insertId;

        // Insert a new row in the user_subscription table with the user's subscription
        db.query(
          'INSERT INTO user_subscription (user_id, subscription_type, start_date) VALUES (?, ?, ?)',
          [userId, 'Basic', new Date()],
          (subscriptionError, subscriptionResults) => {
            if (subscriptionError) {
              console.error('Error during subscription:', subscriptionError);
              res.status(500).json({ error: 'An error occurred during subscription.' });
            } else {
              res.json({
                message: 'Registration and subscription successful',
                user: { userId, username }
              });
            }
          }
        );
      }
    }
  );
});

// ...



app.put('/updateSubscription', (req, res) => {
  const { userId, subscription } = req.body;

  // Update the subscription type in the user_subscription table
  db.query(
    'UPDATE user_subscription SET subscription_type = ? WHERE user_id = ?',
    [subscription, userId],
    (error, results) => {
      if (error) {
        console.error('Error updating subscription:', error);
        res.status(500).json({ error: 'An error occurred while updating subscription.' });
      } else {
        res.json({ message: 'Subscription updated successfully.' });
      }
    }
  );
});


app.get('/getUserData/:userId', (req, res) => {
  const userId = req.params.userId;

  // Fetch user data including email, mobile, and subscription based on the userId
  db.query(
    'SELECT u.user_id, u.username, u.email, u.mobile, us.subscription_type AS subscription FROM users u LEFT JOIN user_subscription us ON u.user_id = us.user_id WHERE u.user_id = ?',
    [userId],
    (error, results) => {
      if (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'An error occurred while fetching user data.' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'User not found.' });
      } else {
        const userData = results[0];
        res.json({
          user: {
            userId: userData.user_id,
            username: userData.username,
            email: userData.email,
            mobile: userData.mobile,
            subscription: userData.subscription
          }
        });
      }
    }
  );
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
