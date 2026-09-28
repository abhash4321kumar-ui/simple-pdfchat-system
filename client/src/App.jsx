import { Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { Logoutfnc } from './apis/user.api';
import { useState } from 'react';


function App() {

  const [logoutmessage, setlogoutmessage] = useState('')

  const location = useLocation();

  const navLinkClass = (path) =>
    `text-sm font-medium transition-colors capitalize ${location.pathname === path
      ? 'text-[#16233A]'
      : 'text-[#16233A]/55 hover:text-[#16233A]'
    }`;

  return (
    <div>
      <nav className="sticky top-0 z-10 bg-[#F6F4EE]/95 backdrop-blur border-b border-[#16233A]/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-serif text-lg capitalize text-[#16233A] tracking-tight">
            documind-ai
          </Link>
          <div className="flex gap-6">
            <Link to="/" className={navLinkClass('/')}>home</Link>
            <Link to="/dashboard" className={navLinkClass('/dashboard')}>dashboard</Link>
            <Link to='/login' className={navLinkClass('/login')}>login</Link>
          </div>
        </div>
        <button
          onClick={() => {
            Logoutfnc()
            setTimeout(() => {
              setlogoutmessage('user loggedout succesfully!')
            }, 1000);
          }}
          className="text-sm cursor-pointer font-medium px-4 py-2 rounded-lg border border-[#16233A]/15 text-[#16233A] hover:bg-[#16233A]/5 transition-colors"
        >
         {logoutmessage ? logoutmessage : ' Logout'}
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App