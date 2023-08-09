import React,{useState, useEffect} from 'react';
import {  Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ProfilePage from './components/ProfilePage';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';
import axios from 'axios';

function App() {

  
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>

    </div>
  );
}

export default App;
