import React, { useState } from 'react';
import './styles.css';

export function RenderDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`dashboard ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>User Name</h3>
        </div>
        
        <div className="sidebar-menu">
          <button 
            className={`menu-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveMenu('dashboard')}
          >
            Dashboard
          </button>
        </div>
        
        <div className="sidebar-footer">
          <button className="logout-btn">Logout</button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <button className="toggle-sidebar" onClick={toggleSidebar}>
          {sidebarOpen ? '◀' : '▶'}
        </button>
        
        {activeMenu === 'dashboard' && (
          <div className="dashboard-grid">
            <div className="grid-column">
              <h2>Upcoming Booking Hotel</h2>
              <div className="content-placeholder">
                {/* Your upcoming bookings content would go here */}
                <p>No upcoming bookings</p>
              </div>
            </div>
            
            <div className="grid-column">
              <h2>Past Booked Hotel</h2>
              <div className="content-placeholder">
                {/* Your past bookings content would go here */}
                <p>No past bookings</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};