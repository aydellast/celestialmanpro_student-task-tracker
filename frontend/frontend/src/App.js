import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DashboardLayout from './components/DashboardLayout';
import Home from './components/Home';
import Kolaborasi from './components/Kolaborasi'; // Pastikan file Kolaborasi.js sudah ada

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute untuk halaman autentikasi awal */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rute utama Dashboard menggunakan Layout khusus */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Halaman Kalender (Home) otomatis muncul pertama kali saat ke /dashboard */}
          <Route index element={<Home />} />
          
          {/* Halaman tugas kelompok aksesnya lewat /dashboard/kolaborasi */}
          <Route path="kolaborasi" element={<Kolaborasi />} />
        </Route>

        {/* Jika user mengakses halaman selain di atas, otomatis diarahkan ke login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;