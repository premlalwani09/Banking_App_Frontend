import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  CreditCard,
  ArrowRightLeft,
  FileText,
  User,
  LogOut,
  Menu,
  X,
  Building2
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Accounts', path: '/accounts', icon: <CreditCard size={20} /> },
    { name: 'Transactions', path: '/transactions', icon: <ArrowRightLeft size={20} /> },
    { name: 'Transfer', path: '/transfer', icon: <ArrowRightLeft size={20} /> },
    { name: 'Statements', path: '/statement', icon: <FileText size={20} /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top navigation */}
      <nav className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-primary-600" />
              <span className="ml-2 font-bold text-lg">SecureBank</span>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <User size={16} className="text-primary-600" />
                </div>
                <span className="font-medium">{user?.firstName} {user?.lastName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-1 text-sm rounded-md text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? 'bg-primary-50 text-primary-700 block pl-3 pr-4 py-2 border-l-4 border-primary-500 text-base font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium'
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </div>
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
            >
              <div className="flex items-center">
                <LogOut size={20} className="mr-3" />
                Logout
              </div>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Desktop sidebar and main content */}
      <div className="flex flex-1">
        <aside className="hidden md:flex bg-white shadow w-64 flex-col flex-shrink-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-primary-50 text-primary-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    }
                  >
                    <div className="mr-3">{link.icon}</div>
                    {link.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;