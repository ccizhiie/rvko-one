import "./App.css";
import Register from "./Page/Register";
import Login from "./Page/Login";
import Account from "./Page/Account";
import Forgot2 from "./Page/Forgot2";
import Forgot3 from "./Page/Forgot3";
import CodeOtp from "./Page/CodeOtp";
import Coba from "./Page/selectlanguage";
import Home from "./Page/Home";
import Tinder from "./Page/Tinder";
import Language from "./Page/Language";
import Belajartailwind from "./Page/Belajartailwind";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Language />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account/:id" element={<Account />} />
        <Route path="/forgot2" element={<Forgot2 />} />
        <Route path="/forgot3/:uniqueId" element={<Forgot3 />} />
        <Route path="/codeotp/:uniqueId" element={<CodeOtp />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/tinder" element={<Tinder />} />
        <Route path="bahasa" element={<Language/>} />
        <Route path="/tinder/:id" element={<Tinder />} />
        <Route path="/coba" element={<Coba />} />
        <Route path="/belajar" element={<Belajartailwind/>} />
        <Route path="/account" element={<Account />} />
        
      </Routes>
    
    </Router>
  );
}

export default App;
