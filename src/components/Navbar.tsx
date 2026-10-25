import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageView } from '../types';
import { Sprout, Menu, X, PlusCircle, Search, ClipboardList, User, LogOut, PhoneCall } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, currentUser, logout, requests } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView; icon: React.ReactNode; badge?: number }[] = [
    { label: 'Home', page: 'home', icon: null },
    { label: 'Request a Service', page: 'request-service', icon: <PlusCircle size={16} /> },
    { label: 'Find Service Providers', page: 'find-providers', icon: <Search size={16} /> },
    { label: 'View All Requests', page: 'view-requests', icon: <ClipboardList size={16} />, badge: requests.length },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-emerald-900 text-white shadow-md border-b border-emerald-800">
      {/* Top Kisan Support / Helpline Announcement Banner */}
      <div className="bg-emerald-950/80 px-4 py-1.5 text-xs border-b border-emerald-800/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-emerald-200">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Kisan Digital Portal: Connecting Indian Farmers to Local Service Providers</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-100 text-xs font-medium">
            <span className="hidden sm:inline-flex items-center gap-1">
              <PhoneCall size={13} className="text-emerald-400" />
              Kisan Helpline: <strong>1800-180-1551</strong> (Toll Free)
            </span>
            <span className="text-emerald-400">|</span>
            <span>All Services: ₹0 Commission</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus-visible:outline-2 focus-visible:outline-emerald-300 rounded-lg p-1"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md text-white group-hover:scale-105 transition-transform">
              <Sprout size={28} className="stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">Rural Connect</span>
                <span className="text-[11px] bg-emerald-800 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-700">
                  Rural India
                </span>
              </div>
              <p className="text-xs text-emerald-200 font-medium tracking-wide">
                Smart Support for Every Farmer
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors relative ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-emerald-100 hover:text-white hover:bg-emerald-800/60'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                  {link.badge !== undefined && (
                    <span className="ml-1 text-[11px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-600 text-white">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Auth / Quick Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 bg-emerald-800/80 px-3 py-1.5 rounded-xl border border-emerald-700">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.role === 'farmer' ? '👨‍🌾' : '🚜'}
                </div>
                <div className="text-left text-xs leading-tight">
                  <p className="font-bold text-white truncate max-w-[120px]">{currentUser.name}</p>
                  <p className="text-emerald-300 text-[11px] capitalize">{currentUser.village || currentUser.role}</p>
                </div>
                <button
                  onClick={logout}
                  title="Sign out"
                  className="text-emerald-300 hover:text-white p-1 rounded hover:bg-emerald-700 transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-100 hover:text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors border border-emerald-700"
              >
                <User size={16} />
                <span>Login / Register</span>
              </button>
            )}

            {/* Quick Request Button on Desktop */}
            <button
              onClick={() => handleNavClick('request-service')}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-lg transition-all shadow-md active:scale-95"
            >
              <PlusCircle size={16} />
              <span>Post Need</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('request-service')}
              className="sm:hidden px-3 py-1.5 text-xs font-bold bg-amber-400 text-slate-900 rounded-lg"
            >
              Post Need
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-800 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950 border-t border-emerald-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold ${
                  isActive
                    ? 'bg-emerald-700 text-white'
                    : 'text-emerald-100 hover:bg-emerald-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && (
                  <span className="text-xs bg-emerald-600 px-2 py-0.5 rounded-full font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-emerald-800 space-y-2">
            {currentUser ? (
              <div className="flex items-center justify-between p-3 bg-emerald-900 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currentUser.role === 'farmer' ? '👨‍🌾' : '🚜'}</span>
                  <div>
                    <p className="font-bold text-white text-sm">{currentUser.name}</p>
                    <p className="text-xs text-emerald-300">{currentUser.village}, {currentUser.district}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 text-xs bg-emerald-800 hover:bg-red-800 text-white rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-800 text-white font-semibold text-center"
              >
                <User size={18} />
                <span>Login or Register as Farmer / Provider</span>
              </button>
            )}
            
            <div className="p-3 bg-emerald-900/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <PhoneCall size={16} className="text-emerald-400 shrink-0" />
              <span>Toll Free Kisan Call Centre: <strong>1800-180-1551</strong></span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
