import React, { useState } from 'react';
import useAuthStore from "../../store/auth-store";
import { login, register } from "../../services/api/auth";
import "./styles.css";
import useUserStore from "../../store/user-store";

export function RenderAuth() {
  const { currentTab, setCurrentTab } = useAuthStore();
  const [formData, setFormData] = useState({
    login: { email: '', password: '' },
    register: { name: '', email: '', password: '', confirm: '' }
  });
  const [errors, setErrors] = useState({
    login: '',
    register: ''
  });

  const handleTabChange = (tab: 'login' | 'register') => {
    setCurrentTab(tab);
    setErrors({ ...errors, [tab]: '' });
  };

  const handleInputChange = (formType: 'login' | 'register', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [formType]: {
        ...prev[formType],
        [field]: value
      }
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData.login;
    
    if (!email || !password) {
      setErrors({ ...errors, login: 'Please fill all fields' });
      return;
    }

    try {
      const res = await login({ email, password });
      if (res.status === 200) {
        useUserStore.getState().setUser(res.data.user);
        useUserStore.getState().setToken(res.data.token);
        useUserStore.getState().setIsLoggedIn(true);
        window.location.href = '/dashboard';
      } else {
        setErrors({ ...errors, login: res?.error || 'Login failed' });
      }
    } catch (error) {
      setErrors({ ...errors, login: error?.toString() || 'An error occurred' });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, confirm } = formData.register;

    if (!name || !email || !password || !confirm) {
      setErrors({ ...errors, register: 'Please fill all fields' });
      return;
    }

    if (password !== confirm) {
      setErrors({ ...errors, register: "Passwords don't match!" });
      return;
    }

    try {
      const res = await register({ fullName: name, email, password });
      if (res.status === 201) {
        setCurrentTab('login');
        setFormData(prev => ({
          ...prev,
          register: { name: '', email: '', password: '', confirm: '' }
        }));
        setErrors({ ...errors, register: '' });
      } else {
        setErrors({ ...errors, register: res?.error || 'Registration failed' });
      }
    } catch (error) {
      setErrors({ ...errors, register: error?.toString() || 'An error occurred' });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-banner">
        <div className="banner-content">
          <h1>Welcome, <br />Let's Explore your journey</h1>
        </div>
      </div>
      
      <div className="auth-banner">
        <div className="auth-container">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${currentTab === 'login' ? 'active' : ''}`}
              onClick={() => handleTabChange('login')}
            >
              Login
            </button>
            <button 
              className={`auth-tab ${currentTab === 'register' ? 'active' : ''}`}
              onClick={() => handleTabChange('register')}
            >
              Register
            </button>
          </div>
          
          <div className="auth-content">
            {/* Login Form */}
            <form 
              className={`auth-form ${currentTab === 'login' ? 'active' : ''}`}
              onSubmit={handleLogin}
            >
              <div className="form-group">
                <input 
                  type="email" 
                  value={formData.login.email}
                  onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                  placeholder="Email" 
                  required 
                  className="input" 
                />
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  value={formData.login.password}
                  onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                  placeholder="Password" 
                  required 
                  className="input" 
                />
              </div>
              {errors.login && <div className="error-message">{errors.login}</div>}
              <button type="submit" className="auth-button">Login</button>
            </form>
            
            {/* Register Form */}
            <form 
              className={`auth-form ${currentTab === 'register' ? 'active' : ''}`}
              onSubmit={handleRegister}
            >
              <div className="form-group">
                <input 
                  type="text" 
                  value={formData.register.name}
                  onChange={(e) => handleInputChange('register', 'name', e.target.value)}
                  placeholder="Full Name" 
                  required 
                  className="input" 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  value={formData.register.email}
                  onChange={(e) => handleInputChange('register', 'email', e.target.value)}
                  placeholder="Email" 
                  required 
                  className="input" 
                />
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  value={formData.register.password}
                  onChange={(e) => handleInputChange('register', 'password', e.target.value)}
                  placeholder="Password" 
                  required 
                  className="input" 
                />
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  value={formData.register.confirm}
                  onChange={(e) => handleInputChange('register', 'confirm', e.target.value)}
                  placeholder="Confirm Password" 
                  required 
                  className="input" 
                />
              </div>
              {errors.register && <div className="error-message">{errors.register}</div>}
              <button type="submit" className="auth-button">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}