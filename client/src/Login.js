import React, { useState } from 'react';
import './Login.css'; // Importing CSS
import NewOnboarding from './NewOnboarding';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [homePage, setHomePage] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const homepagechange = (show) => {
    console.log("meoww",show)
    setHomePage(show)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login form submission here
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return ( 
    <div>
     <div className="login-background">
        { !homePage && 
   <div className="login-container">
      <div className="login-form">
        <h1>Sign-In</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Client User Name</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="login-button"
            onClick={()=>setHomePage(true)}
          >Sign In</button>
        </form>
        <p className="signup-link">New to Amazon? <a href="#">Create your Amazon account</a></p>
      </div>
    </div>
      }
      {
        homePage && <NewOnboarding/>
      }
    </div>
    </div>

  );
};

export default LoginForm;