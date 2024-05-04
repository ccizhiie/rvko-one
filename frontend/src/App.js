
import './App.css';
import Register from './Page/Register';
import Login from './Page/Login';
import Account from './Page/Account';
import Forgot from './Page/Forgot';
import Forgot2 from './Page/Forgot2';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Forgot />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/account' element={<Account/>} />
        <Route path='/forgot' element={<Forgot/>} />
        <Route path='/forgot2' element={<Forgot2/>} />

      </Routes>
    </Router>
  );
}

export default App;
