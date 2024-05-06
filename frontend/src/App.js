
import './App.css';
import Register from './Page/Register';
import Login from './Page/Login';
import Account from './Page/Account';
import Forgot2 from './Page/Forgot2';
import Forgot3 from './Page/Forgot3';
import CodeOtp from './Page/CodeOtp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/account' element={<Account/>} />
        <Route path='/forgot2' element={<Forgot2/>} />
        <Route path='/forgot3' element={<Forgot3/>} />
        <Route path='/codeotp' element={<CodeOtp/>} />


      </Routes>
    </Router>
  );
}

export default App;
