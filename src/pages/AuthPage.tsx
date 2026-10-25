import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User } from '../types';
import { DEMO_USERS } from '../data/sampleData';
import { 
  Sprout, 
  User as UserIcon, 
  Phone, 
  Lock, 
  MapPin, 
  Briefcase, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  Tractor
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { currentUser, login, logout, setCurrentPage, showToast } = useApp();

  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState<'farmer' | 'provider'>('farmer');

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone.trim()) {
      showToast('Please enter your phone number', 'info');
      return;
    }

    const newUser: User = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: name.trim() || (role === 'farmer' ? 'Kisan Member' : 'Rural Provider'),
      phone: phone.trim(),
      role: role,
      village: village.trim() || 'Rampur',
      district: district.trim() || 'Sitapur',
      state: 'Uttar Pradesh',
      avatar: role === 'farmer' ? '👨‍🌾' : '🚜'
    };

    login(newUser);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickDemoLogin = (demoRole: 'farmer' | 'provider') => {
    login(DEMO_USERS[demoRole]);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If already logged in, show current session card with option to sign out or switch
  if (currentUser) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white rounded-3xl p-8 border-2 border-emerald-100 shadow-md text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-3xl flex items-center justify-center mx-auto shadow-xs">
          {currentUser.avatar || '👨‍🌾'}
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Active Account
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2">{currentUser.name}</h2>
          <p className="text-xs font-medium text-emerald-700 capitalize">Registered {currentUser.role}</p>
          <p className="text-xs text-slate-500">{currentUser.village}, {currentUser.district}</p>
          <p className="text-xs text-slate-500">{currentUser.phone}</p>
        </div>

        <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 text-xs text-emerald-900">
          <p className="font-semibold">Ready to request or manage agricultural services</p>
          <p className="text-[11px] text-emerald-700 mt-0.5">Your village details will automatically fill in service requests.</p>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => {
              setCurrentPage('request-service');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Go to Request a Service
          </button>
          <button
            onClick={logout}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Sign Out of Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center mx-auto shadow-md">
          <Sprout size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {isRegister ? 'Join Rural Connect' : 'Welcome to Rural Connect'}
        </h1>
        <p className="text-xs text-slate-600 max-w-sm mx-auto">
          {isRegister
            ? 'Register as a Farmer or Agricultural Service Provider in your village.'
            : 'Sign in to post needs, respond to jobs, and connect directly with local farmers.'}
        </p>
      </div>

      {/* Instant Demo Login Box */}
      <div className="bg-amber-50/90 rounded-2xl p-4 border border-amber-200 text-amber-950 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-amber-600" />
          <span className="text-xs font-bold uppercase tracking-wider">Fast Demo Access (One-Click)</span>
        </div>
        <p className="text-[11px] text-amber-800">
          Skip typing credentials and test the prototype instantly:
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('farmer')}
            className="py-2.5 px-3 bg-white hover:bg-amber-100/60 border border-amber-300 rounded-xl text-xs font-bold text-slate-900 flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span>👨‍🌾 Demo Farmer</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('provider')}
            className="py-2.5 px-3 bg-white hover:bg-amber-100/60 border border-amber-300 rounded-xl text-xs font-bold text-slate-900 flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span>🚜 Demo Provider</span>
          </button>
        </div>
      </div>

      {/* Main Auth Form Container */}
      <div className="bg-white rounded-3xl border-2 border-emerald-100 shadow-md p-6 sm:p-8 space-y-6">
        
        {/* Toggle Login vs Register */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`py-2 rounded-lg transition-colors cursor-pointer ${
              !isRegister ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`py-2 rounded-lg transition-colors cursor-pointer ${
              isRegister ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            New Registration
          </button>
        </div>

        {/* Role Selector: Farmer or Provider */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">I am a:</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('farmer')}
              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                role === 'farmer'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                  : 'border-slate-200 text-slate-700 bg-white'
              }`}
            >
              <span className="text-xl">👨‍🌾</span>
              <div>
                <p className="text-xs">Farmer (Kisan)</p>
                <p className="text-[10px] text-slate-500 font-normal">Need services</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRole('provider')}
              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                role === 'provider'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                  : 'border-slate-200 text-slate-700 bg-white'
              }`}
            >
              <span className="text-xl">🚜</span>
              <div>
                <p className="text-xs">Service Provider</p>
                <p className="text-[10px] text-slate-500 font-normal">Tractor, Labour, Buyer</p>
              </div>
            </button>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <UserIcon size={14} className="text-emerald-700" /> Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar Verma"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}

          {isRegister && role === 'provider' && (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <Briefcase size={14} className="text-emerald-700" /> Business / Farm Enterprise Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Kisan Kranti Machinery Works"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Phone size={14} className="text-emerald-700" /> Mobile Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {isRegister && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <MapPin size={14} className="text-emerald-700" /> Village Name
                </label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Rampur"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  District
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Sitapur"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Lock size={14} className="text-emerald-700" /> Password or 4-digit PIN
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{isRegister ? 'Complete Registration' : 'Sign In to Account'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-[11px] text-slate-400 text-center">
          In this frontend prototype, authentication is stored in local storage so you can easily simulate both farmer and provider perspectives.
        </p>

      </div>

    </div>
  );
};
