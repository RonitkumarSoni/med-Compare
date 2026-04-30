import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className="relative py-1 font-bold font-manrope text-sm tracking-tight transition-colors group"
      style={{ color: isActive ? '#0055c9' : '#64748b' }}
    >
      {children}
      {/* Premium Underline (Active) */}
      <span
        className="absolute left-0 -bottom-1 h-[2.5px] bg-[#0055c9] rounded-full transition-all duration-300 ease-out"
        style={{
          width: isActive ? '100%' : '0%',
          opacity: isActive ? 1 : 0,
        }}
      />
      {/* Subtle Underline (Hover) */}
      {!isActive && (
        <span className="absolute left-0 -bottom-1 h-[2.5px] w-0 bg-blue-100 rounded-full transition-all duration-300 ease-out group-hover:w-full group-hover:opacity-100 opacity-0" />
      )}
    </Link>
  );
};

const Navbar = ({ fullWidth = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/medicine-compare?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 right-0 z-50 bg-white/30 backdrop-blur-3xl shadow-xl shadow-blue-900/5 border-b border-white/20",
        fullWidth ? "left-0" : "left-0 md:left-64"
      )}
    >
      <nav className="flex justify-between items-center px-8 py-4 w-full max-w-[1440px] mx-auto">
        <div className="flex items-center gap-4 flex-1">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent font-headline tracking-tighter shrink-0">
              MedCompare
            </span>
          </Link>
          
          <div className="relative group hidden md:block flex-1 max-w-sm ml-4">
            <div className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300">
              <span className="material-symbols-outlined text-xl">search</span>
            </div>
            <input 
              className="pl-12 pr-4 py-3 bg-slate-50/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl w-full text-sm focus:ring-[4px] focus:ring-primary/10 focus:bg-white focus:border-primary/40 focus:shadow-[0_0_20px_rgba(0,85,201,0.1)] transition-all duration-500 outline-none font-body placeholder:text-slate-400/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]" 
              placeholder="Search (e.g. Paracetamol)..." 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
            {/* Premium Animated Border Line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent group-focus-within:w-2/3 transition-all duration-700 opacity-0 group-focus-within:opacity-100"></div>
          </div>

          <div className="hidden xl:flex items-center gap-8 ml-4">
            <NavLink to="/medicine-compare">Compare</NavLink>
            <NavLink to="/pharmacies">Pharmacies</NavLink>
            <NavLink to="/saved-watchlist">Watchlist</NavLink>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/notifications" className="p-2 text-slate-500 hover:text-primary transition-all active:scale-90 relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-white"></span>
              </Link>
              <Link to="/settings" className="p-2 text-slate-500 hover:text-primary transition-all active:scale-90 relative">
                <span className="material-symbols-outlined">settings</span>
              </Link>
              <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-white card-shadow cursor-pointer hover:border-primary/20 transition-all bg-surface-container">
                <img 
                  alt="User avatar" 
                  className="w-full h-full object-cover" 
                  src={user.avatar || (
                    // Simple logic for gender-based avatar
                    user.gender === 'female' || (user.name && /a$|i$|ia$|na$|ly$|ette$|een$/i.test(user.name)) 
                    ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDOT1xwolC4XmU88CPXotkoldvHs4O9iXeAlr0wAZMEbBct0ZVCNON9GxSQt0aHSmbed_Q0YkEaYhvzQ2NjBAGvFvWpuFjCJhMqnW3B1Rb7CqLUH2LFuJdZ7jlyTdTWI5zQKZ6DBEFXDktkf19kt-gm4emNEky-i7kfacHR1X8siXHjTr0EgOO8i0_mUTqpLA5IDaxoY3a-3owACAYzY7rhqQnj6EcV0E96nVQsvQ89A2aklUuxZBY5DtYHvhTWgCjHaXKFbOP3fH1i" 
                    : "https://lh3.googleusercontent.com/aida-public/AB6AXuCwUzBTJxiOXYFaEmwIHvQyscE5C0Ivvow8fXttVmy5drS4bsJaHOtbmr3pP-YcWG0v3BBJ9soh8BBvcn3rgPOifBqsUaaFhwKvBldSwTQBKZSjO9R3P73JQR3SouwnVra5cMdtra8opSg2JLZpEssKN5L3qvqNYbKZ4DrK5801oyOHFBGbkO0sevXmXPsuIAPu8ll-zW3GqZJpzme_-SMYmEoz_3OZJ6M5DYl1vgxlkar2dGVQqJwWBUpDNDnaYEvlop9czQZ1Df9n"
                  )}
                />
              </Link>
            </>
          ) : (
            <Link 
              to="/login"
              className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold font-headline shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
