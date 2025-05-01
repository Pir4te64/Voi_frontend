// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
