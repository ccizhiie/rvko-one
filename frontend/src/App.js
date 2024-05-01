
import './App.css';
import Register from './Page/Register';
import Login from './Page/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
