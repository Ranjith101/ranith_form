import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  const location = useLocation(); // Use the location object from React Router

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [subscription, setSubscription] = useState('Basic');
  
useEffect(() => {
    const userId = location.state.userId; // Access userId from location state
console.log(userId)
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

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="mb-4">Profile</h2>
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
            <button className="btn btn-primary" onClick={handleUpdateSubscription}>
              Update Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
