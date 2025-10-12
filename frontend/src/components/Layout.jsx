import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Bell, MapPin, Users, AlertTriangle, Settings } from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: AlertTriangle,
      roles: ['user', 'volunteer', 'admin']
    },
    {
      name: 'Incidents',
      href: '/incidents',
      icon: Bell,
      roles: ['volunteer', 'admin']
    },
    {
      name: 'Volunteers',
      href: '/volunteers',
      icon: Users,
      roles: ['admin']
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      roles: ['user', 'volunteer', 'admin']
    }
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-primary-600">
                  NeighboursCare
                </h1>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {navigation
                  .filter(item => item.roles.includes(user?.role))
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.name}
                      </a>
                    );
                  })}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-700">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="capitalize">{user?.role}</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span>{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 hover:text-primary-600 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;