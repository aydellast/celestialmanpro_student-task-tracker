import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Tombol (+) hanya akan muncul jika pengguna berada di halaman Home Dashboard
  const isHomePage = location.pathname === '/dashboard' || location.pathname === '/dashboard/';

  return (
    <div className="login-page-wrapper">
      <div className="phone-container dashboard-phone">
        
        {/* Area isi Konten Utama (Home / Kolaborasi) */}
        <div className="dashboard-content">
          <Outlet />
        </div>

        {/* Tombol Melayang (+) Sesuai Gambar UI/UX */}
        {isHomePage && (
          <button 
            className="fab-plus" 
            onClick={() => navigate('/dashboard/tambah-tugas')}
          >
            +
          </button>
        )}

        {/* Bar Navigasi Bagian Bawah */}
        <nav className="bottom-nav">
          
          {/* 1. Colaboration */}
          <NavLink 
            to="/dashboard/kolaborasi" 
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          >
            <i className="fa-solid fa-users"></i>
            <span>Colaboration</span>
          </NavLink>

          {/* 2. Home */}
          <NavLink 
            to="/dashboard" 
            end 
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          >
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </NavLink>

          {/* 3. Focus */}
          <NavLink 
            to="/dashboard/focus" 
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          >
            <i className="fa-solid fa-crosshairs"></i>
            <span>Focus</span>
          </NavLink>
          
        </nav>
      </div>
    </div>
  );
};

export default DashboardLayout;