import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Liked from './pages/Like'
import { AuthProvider } from './context/AuthContext';
import { AdminRoute } from './context/AdminRoute';
import { MusicProvider } from './context/MusicContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MusicProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/like' element={<Liked />} />
            <Route
              path='/admin'
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </MusicProvider>
    </AuthProvider>
  </StrictMode>
);