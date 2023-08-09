// import React, { useState } from 'react';
// import './App.css';
// import axios from 'axios';

// function App() {
//   const [showLogin, setShowLogin] = useState(true);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [subscription, setSubscription] = useState('Basic');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:3001/login', {
//         username,
//         password
//       });
      
//       const { userId, username: loggedInUsername } = response.data.user;
//       setLoggedIn(true);
//       setUserId(userId);
//       setUsername(loggedInUsername);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post('http://localhost:3001/register', {
//         username,
//         password
//       });
      
//       const { userId, username: registeredUsername } = response.data.user;
//       setLoggedIn(true);
//       setUserId(userId);
//       setUsername(registeredUsername);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleUpdateSubscription = async () => {
//     try {
//       const response = await axios.put('http://localhost:3001/updateSubscription', {
//         userId,
//         subscription
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="App">
//       {loggedIn ? (
//         <div>
//           <h1>Welcome, {username}!</h1>
//           <label>Select Subscription:</label>
//           <select
//             value={subscription}
//             onChange={(e) => setSubscription(e.target.value)}
//           >
//             <option value="Basic">Basic</option>
//             <option value="Medium">Medium</option>
//             <option value="Advanced">Advanced</option>
//           </select>
//           <button onClick={handleUpdateSubscription}>Update Subscription</button>
//         </div>
//       ) : (
//         <div>
//           <h1>{showLogin ? 'Login' : 'Register'}</h1>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={showLogin ? handleLogin : handleRegister}>
//             {showLogin ? 'Login' : 'Register'}
//           </button>
//           <p>
//             {showLogin ? "Don't have an account?" : 'Already have an account?'}
//             <span
//               style={{ cursor: 'pointer', color: 'blue' }}
//               onClick={() => setShowLogin(!showLogin)}
//             >
//               {showLogin ? ' Register here' : ' Login here'}
//             </span>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [subscription, setSubscription] = useState('Basic');

  // Fetch user data upon login and populate the form
  useEffect(() => {
    if (loggedIn) {
      // Fetch user data here using the user's ID
      // For demonstration purposes, let's assume a GET request to retrieve user data
      axios.get(`http://localhost:3001/getUserData/${userId}`)
        .then(response => {
          const userData = response.data.user;
          setUsername(userData.username);
          setSubscription(userData.subscription);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [loggedIn, userId]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password
      });
      
      const { userId, username: loggedInUsername } = response.data.user;
      setLoggedIn(true);
      setUserId(userId);
      setUsername(loggedInUsername);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username,
        password
      });
      
      const { userId, username: registeredUsername } = response.data.user;
      setLoggedIn(true);
      setUserId(userId);
      setUsername(registeredUsername);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateSubscription = async () => {
    try {
      const response = await axios.put('http://localhost:3001/updateSubscription', {
        userId,
        subscription
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      {loggedIn ? (
        <div>
          <h1>Welcome, {username}!</h1>
          <input defaultValue={username} disabled/>
          <label>Select Subscription:</label>
          <select
            value={subscription}
            onChange={(e) => setSubscription(e.target.value)}
          >
            <option value="Basic">Basic</option>
            <option value="Medium">Medium</option>
            <option value="Advanced">Advanced</option>
          </select>
          <button onClick={handleUpdateSubscription}>Update Subscription</button>
        </div>
      ) : (
        <div>
          <h1>{showLogin ? 'Login' : 'Register'}</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={showLogin ? handleLogin : handleRegister}>
            {showLogin ? 'Login' : 'Register'}
          </button>
          <p>
            {showLogin ? "Don't have an account?" : 'Already have an account?'}
            <span
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={() => setShowLogin(!showLogin)}
            >
              {showLogin ? ' Register here' : ' Login here'}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
