const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3001;

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

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Here, you would typically compare the username and password with data stored in your database
    // For demonstration purposes, let's assume you have a users table with username and hashedPassword columns
    db.query(
      'SELECT id, username FROM users WHERE username = ? AND password = ?', 
      [username, password], // Replace hashedPassword with your actual hashing function
      (error, results) => {
        if (error) {
          console.error('Error during login:', error);
          res.status(500).json({ error: 'An error occurred during login.' });
        } else if (results.length === 0) {
          res.status(401).json({ error: 'Invalid username or password.' });
        } else {
          const user = results[0];
          res.json({
            message: 'Login successful',
            user: { userId: user.id, username: user.username }
          });
        }
      }
    );
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
        res.json({
          message: 'Registration successful',
          user: { userId: results.insertId, username }
        });
      }
    }
  );
});

  

app.put('/updateSubscription', (req, res) => {
  const { userId, subscription } = req.body;

  db.query(
    'UPDATE users SET subscription = ? WHERE id = ?',
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

  // Fetch user data including email and mobile based on the userId
  db.query(
    'SELECT id, username, email, mobile, subscription FROM users WHERE id = ?', 
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
            userId: userData.id,
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



// app.get('/getUserData/:userId', (req, res) => {
//     const userId = req.params.userId;
  
//     // Here, you would fetch user data based on the userId
//     // For demonstration purposes, let's assume you have a users table
//     db.query(
//       'SELECT id, username, subscription FROM users WHERE id = ?', 
//       [userId],
//       (error, results) => {
//         if (error) {
//           console.error('Error fetching user data:', error);
//           res.status(500).json({ error: 'An error occurred while fetching user data.' });
//         } else if (results.length === 0) {
//           res.status(404).json({ error: 'User not found.' });
//         } else {
//           const userData = results[0];
//           res.json({
//             user: {
//               userId: userData.id,
//               username: userData.username,
//               subscription: userData.subscription
//             }
//           });
//         }
//       }
//     );
//   });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
