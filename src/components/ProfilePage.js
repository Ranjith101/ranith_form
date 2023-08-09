import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProfilePage.css'; // Import your custom CSS file for styling

function ProfilePage() {
  const location = useLocation(); // Use the location object from React Router  
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [subscription, setSubscription] = useState('Basic');

  useEffect(() => {
    const userId = location.state.userId;

    axios.get(`http://localhost:3001/getUserData/${userId}`)
      .then(response => {
        const userData = response.data.user;
        setUsername(userData.username);
        setEmail(userData.email);
        setMobile(userData.mobile);
        setSubscription(userData.subscription);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [location]);

//   const handleUpdateSubscription = async () => {
//     try {
//       const response = await axios.put('http://localhost:3001/updateSubscription', {
//         userId: location.state.userId,
//         subscription
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

const handleUpdateSubscription = async () => {
    try {
      const response = await axios.put('http://localhost:3001/updateSubscription', {
        userId: location.state.userId,
        subscription
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-heading">Vendor Register</h2>
        <div className="profile-form">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              defaultValue={username}
              disabled
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
              defaultValue={email}
              disabled
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
              defaultValue={mobile}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subscription" className="form-label">
              Subscription
            </label>
            <select
              id="subscription"
              className="form-select"
              value={subscription}
              onChange={(e) => setSubscription(e.target.value)}
            >
              <option value="Basic">Basic</option>
              <option value="Medium">Medium</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <button className="btn btn-primary profile-button" onClick={handleUpdateSubscription}>
            Update Subscription
          </button>
        </div>
        <button className="btn btn-success profile-logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default ProfilePage;
