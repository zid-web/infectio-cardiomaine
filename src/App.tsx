import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { InfectionDetail } from './pages/InfectionDetail';
import './styles/variables.css';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/infection/:id" element={<InfectionDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
