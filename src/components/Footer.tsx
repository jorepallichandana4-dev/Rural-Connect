import React from 'react';
import { useApp } from '../context/AppContext';
import { ServiceType } from '../types';
import { Sprout, Phone, ShieldCheck, Heart, Info, ArrowUpRight } from 'lucide-react';
import { SERVICE_METADATA } from '../data/sampleData';

export const Footer: React.FC = () => {
  const { navigateToService, setCurrentPage } = useApp();

  const services: ServiceType[] = [
    'Agricultural Equipment',
    'Agricultural Labour',
    'Crop Buyers',
    'Crop Transportation',
    'Crop Storage',
  ];

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 mt-20">
      {/* Top Value Banner */}
      <div className="bg-emerald-900/60 border-b border-emerald-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300 shrink-0">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Direct Village Connection</h4>
              <p className="text-xs text-emerald-200">No predatory commission or middlemen. Direct farmer-to-provider talks.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300 shrink-0">
              <Phone size={26} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Kisan Helpline 1800-180-1551</h4>
              <p className="text-xs text-emerald-200">Free telephonic agricultural assistance in 22 local Indian languages.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300 shrink-0">
              <Sprout size={26} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Simple for Every Farmer</h4>
              <p className="text-xs text-emerald-200">Designed with high legibility, large touch targets, and simple English.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Sprout size={24} />
              </div>
              <span className="text-xl font-black text-white">Rural Connect</span>
            </div>
            <p className="text-xs text-emerald-300 leading-relaxed">
              Smart Support for Every Farmer. Empowering rural communities across India with instant access to tractors, harvest crews, mandi buyers, transport, and cold storages.
            </p>
            <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-800 text-xs">
              <p className="font-semibold text-emerald-200 flex items-center gap-1.5 mb-1">
                <Info size={14} className="text-amber-400" /> Prototype Demonstration
              </p>
              <p className="text-[11px] text-emerald-400">
                All provider profiles and requests displayed are realistic sample demonstrations for evaluation.
              </p>
            </div>
          </div>

          {/* 5 Core Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300 mb-4">
              5 Core Services
            </h4>
            <ul className="space-y-2 text-xs">
              {services.map((svc) => (
                <li key={svc}>
                  <button
                    onClick={() => navigateToService(svc, 'find-providers')}
                    className="text-emerald-200 hover:text-white flex items-center justify-between w-full text-left py-1 group transition-colors"
                  >
                    <span>{svc}</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300 mb-4">
              Farmer Actions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('request-service');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-emerald-200 hover:text-white py-1 block"
                >
                  Post a Service Request
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('find-providers');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-emerald-200 hover:text-white py-1 block"
                >
                  Browse Service Providers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('view-requests');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-emerald-200 hover:text-white py-1 block"
                >
                  View All Farmer Requests
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('auth');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-emerald-200 hover:text-white py-1 block"
                >
                  Farmer & Provider Login
                </button>
              </li>
            </ul>
          </div>

          {/* How to run info & National Resources */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300 mb-4">
              How to Run & Support
            </h4>
            <div className="space-y-3 text-xs text-emerald-300">
              <div className="bg-emerald-900/80 p-3 rounded-lg border border-emerald-800">
                <p className="font-semibold text-white mb-1">Developer Execution:</p>
                <code className="text-[11px] bg-emerald-950 px-2 py-0.5 rounded text-amber-300 font-mono block">
                  npm install && npm run dev
                </code>
                <p className="text-[11px] text-emerald-300 mt-1">Runs Vite on http://localhost:3000</p>
              </div>
              <p className="text-[11px]">
                Built with modern React 19, TypeScript, and Tailwind CSS. Responsive on all phones, tablets, and desktop computers.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-emerald-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400 gap-3">
          <p>© {new Date().getFullYear()} Rural Connect India – Smart Support for Every Farmer.</p>
          <p className="flex items-center gap-1">
            Dedicated to the farmers who feed our nation <Heart size={14} className="text-red-400 fill-red-400" />
          </p>
        </div>
      </div>
    </footer>
  );
};
