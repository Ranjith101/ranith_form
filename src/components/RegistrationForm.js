// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function RegistrationForm() {
//   const navigate = useNavigate(); // Use the navigate function from React Router

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');

// //   const handleRegister = async () => {
// //     try {
// //       const response = await axios.post('http://localhost:3001/register', {
// //         username,
// //         password,
// //         email,
// //         mobile,
// //       });

// //       const { userId, username: registeredUsername } = response.data.user;
// //       // Update state or context to indicate successful registration
// //       navigate('/profile'); // Navigate to the profile page
// //     } catch (error) {
// //       console.error('Error:', error);
// //       // Handle registration error
// //     }
// //   };

// const handleRegister = async () => {
//     try {
//       const response = await axios.post('http://localhost:3001/register', {
//         username,
//         password,
//         email,
//         mobile,
//       });
  
//       // Assuming the response structure is { userId, username }
//       const { userId, username: registeredUsername } = response.data.user;
//       console.log(userId)
//   console.log(response.data)
//       if (userId) {
//         // Registration successful
//         navigate('/profile',{ state: { userId } }); // Navigate to the profile page
//       } else {
//         // Handle registration failure, display error message, etc.
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle registration error
//     }
//   };
  
//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card p-4">
//             <h2 className="mb-4">Register</h2>
//             <div className="mb-3">
//               <label htmlFor="username" className="form-label">
//                 Username
//               </label>
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
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="form-control"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="form-control"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="mobile" className="form-label">
//                 Mobile
//               </label>
//               <input
//                 type="text"
//                 id="mobile"
//                 className="form-control"
//                 placeholder="Mobile"
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
//               />
//             </div>
//             <button className="btn btn-primary" onClick={handleRegister}>
//               Register
//             </button>
//             <a href=''onClick={()=>navigate('/')}> Existing user? Login Here</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegistrationForm;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RegistrationForm.css'; // Import your custom CSS file for styling

function RegistrationForm() {
  const navigate = useNavigate(); // Use the navigate function from React Router

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username,
        password,
        email,
        mobile,
      });

      // Assuming the response structure is { userId, username }
      const { userId, username: registeredUsername } = response.data.user;

      if (userId) {
        // Registration successful
        navigate('/profile', { state: { userId } }); // Navigate to the profile page
      } else {
        // Handle registration failure, display error message, etc.
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle registration error
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h2 className="registration-heading">Register</h2>
        <div className="registration-form">
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
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              className="form-control"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <button className="btn btn-primary registration-button" onClick={handleRegister}>
            Register
          </button>
          <p className="login-link" onClick={() => navigate('/')}>
            Existing user? Login Here
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
