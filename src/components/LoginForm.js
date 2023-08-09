import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginForm.css'; // Import your custom CSS file for styling

function LoginForm() {
  const navigate = useNavigate(); // Use the navigate function from React Router

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // New states for alert message
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

      const { userId, username: loggedInUsername } = response.data.user;
      // Pass userId to ProfilePage route
      navigate('/profile', { state: { userId } }); // Make sure to import navigate from 'react-router-dom'
    } catch (error) {
    //   console.error('Error:', error);
    if (error.response && error.response.data && error.response.data.error) {
        // Handle API error with alert message
        console.log(error.response.data.error)
        setAlertMessage(error.response.data.error);
        setShowAlert(true);
      } else {
        console.error('Error:', error,);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">Login</h2>
        {showAlert && (
              <div className="alert alert-danger" role="alert">
                {alertMessage}
              </div>
            )}
        <div className="login-form">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary login-button" onClick={handleLogin}>
            Login
          </button>
          <p className="register-link" onClick={() => navigate('/register')}>
            Don't have an account? Register Here!
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
