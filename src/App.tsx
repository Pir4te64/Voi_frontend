// src/App.tsx
import { Routes, Route} from 'react-router-dom';
import Home from '@/pages/Home/Home';
import RegisterPage from './pages/Register.tsx/Register';

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
    </div>
  );
}

export default App;
