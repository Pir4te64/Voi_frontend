// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import LoginPage from '@/pages/Login/Login';
import RegisterPage from '@/pages/Register/Register';
import FaqPage from '@/pages/Faq/Faq';
import QuienesSomosPage from './pages/QuienesSomos/QuienesSomos';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/sobre-voi" element={<QuienesSomosPage />} />
      </Routes>
    </div>
  );
}

export default App;
