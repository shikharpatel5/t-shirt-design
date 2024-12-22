import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import Orderhistory from './components/orders/Orderhistory';

function App() {
  return (
    <div className="App">
        <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orderhistory />} />
        </Routes>
        </Router>
      
    </div>
  );
}

export default App;
