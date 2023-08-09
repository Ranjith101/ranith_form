// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function LoginForm() {
//   const navigate = useNavigate(); // Use the navigate function from React Router

//   const [showLogin, setShowLogin] = useState(true);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [subscription, setSubscription] = useState('Basic');


// React.useEffect(() => {
//     if (loggedIn && userId) {
//       axios.get(`http://localhost:3001/getUserData/${userId}`)
//         .then(response => {
//           const userData = response.data.user;
//           setUsername(userData.username);
//           setEmail(userData.email);
//           setMobile(userData.mobile);
//           setSubscription(userData.subscription);
         
//         })
//         .catch(error => {
//           console.error('Error fetching user data:', error);
//         });
//     }
//   }, [loggedIn, userId]);

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
  
//       // Pass userId to ProfilePage route
//       navigate('/profile', { state: { userId } }); // Make sure to import navigate from 'react-router-dom'
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  
//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card p-4">
//             <h2 className="mb-4">Login</h2>
//             <div className="mb-3">
//               <label htmlFor="username" className="form-label">Username</label>
//               <input
//                 type="text"
//                 id="username"
//                 className="form-control"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className="form-control"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <button className="btn btn-primary" onClick={handleLogin}>
//               Login
//             </button>
//             <a href=''onClick={()=>navigate('/register')} >Register Here!</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginForm.css'; // Import your custom CSS file for styling

function LoginForm() {
  const navigate = useNavigate(); // Use the navigate function from React Router

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">Login</h2>
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
