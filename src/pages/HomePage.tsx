import React from 'react';
import { useApp } from '../context/AppContext';
import { ServiceType } from '../types';
import { SERVICE_METADATA } from '../data/sampleData';
import { ServiceIcon } from '../components/ServiceIcon';
import { AgriculturalIllustration } from '../components/AgriculturalIllustration';
import { 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  PlusCircle, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  HelpCircle,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setCurrentPage, navigateToService } = useApp();

  const servicesList: ServiceType[] = [
    'Agricultural Equipment',
    'Agricultural Labour',
    'Crop Buyers',
    'Crop Transportation',
    'Crop Storage',
  ];

  return (
    <div className="space-y-14">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white rounded-3xl shadow-xl border border-emerald-700/50">
        <div className="absolute inset-0 opacity-10 bg-agro-pattern pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading & Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
                <Sparkles size={14} className="text-amber-400" />
                <span>India's Dedicated Rural Agricultural Network</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  Rural Connect
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-emerald-300">
                  Smart Support for Every Farmer
                </p>
                <p className="text-sm sm:text-base text-emerald-100 max-w-xl leading-relaxed">
                  Easily hire tractors and harvesters, book skilled farm labour, find fair crop buyers, arrange mandi transport, and reserve safe crop storage — all in one simple place.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setCurrentPage('request-service');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-base shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <PlusCircle size={20} />
                  <span>Request a Service</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentPage('find-providers');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-base border border-emerald-500 shadow-md transition-colors cursor-pointer"
                >
                  <Search size={20} />
                  <span>Find Service Providers</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentPage('view-requests');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-800/80 text-sm font-semibold transition-colors"
                >
                  <span>View All Requests</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-700/60 text-xs">
                <div>
                  <div className="text-xl font-black text-amber-300">100%</div>
                  <div className="text-emerald-200">Zero Commission</div>
                </div>
                <div>
                  <div className="text-xl font-black text-amber-300">5+ Services</div>
                  <div className="text-emerald-200">End-to-End Farming</div>
                </div>
                <div>
                  <div className="text-xl font-black text-amber-300">Direct</div>
                  <div className="text-emerald-200">Village Contacts</div>
                </div>
              </div>
            </div>

            {/* Right Column: Farming Illustration */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-600/60 bg-emerald-950 p-2">
                <AgriculturalIllustration name="farm-hero" className="w-full h-auto rounded-xl" />
                <div className="p-3 bg-emerald-900/90 rounded-b-xl flex items-center justify-between text-xs">
                  <span className="text-emerald-200 font-medium">Kisan Seva Kendra Digital Portal</span>
                  <span className="text-amber-300 font-bold">24/7 Accessible</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Five Primary Service Cards Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            <Layers size={14} />
            <span>Essential Farming Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            5 Core Services for Every Indian Farmer
          </h2>
          <p className="text-sm text-slate-600">
            Select a service to request immediate support or explore verified local providers in your village area.
          </p>
        </div>

        {/* The 5 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((serviceKey, index) => {
            const meta = SERVICE_METADATA[serviceKey];
            const isWide = index === 4; // Make the 5th card take proper space on wide screens or balanced layout

            return (
              <div
                key={serviceKey}
                className={`bg-white rounded-2xl border-2 border-emerald-100/90 hover:border-emerald-500 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group ${
                  isWide ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Card Header & Badge */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-14 h-14 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 text-emerald-700 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                      <ServiceIcon type={serviceKey} size={30} />
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md">
                      {meta.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {serviceKey}
                    </h3>
                    <p className="text-xs font-medium text-emerald-700 mt-0.5">
                      {meta.shortTitle}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {meta.description}
                    </p>
                  </div>

                  {/* Typical Rate pill */}
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs">
                    <span className="text-slate-500 font-medium block text-[11px]">Typical Local Rate:</span>
                    <span className="font-bold text-emerald-900 text-sm">{meta.typicalRate}</span>
                  </div>

                  {/* Popular Offerings */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Common Needs:</span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {meta.popularItems.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigateToService(serviceKey, 'request-service')}
                    className="w-full py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                  >
                    <span>Request Service</span>
                  </button>

                  <button
                    onClick={() => navigateToService(serviceKey, 'find-providers')}
                    className="w-full py-2.5 px-3 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Find Providers</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works Step-by-Step for Farmers */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-100 shadow-sm">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            How Rural Connect Works for You
          </h2>
          <p className="text-sm text-slate-600">
            Designed specifically with simple English and straightforward steps so any farmer can get help without complications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="text-center space-y-3 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 relative">
            <div className="w-12 h-12 rounded-full bg-emerald-700 text-white font-black text-lg flex items-center justify-center mx-auto shadow-sm">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900">Choose Your Service</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select what you need: tractor rental, harvest labour team, crop buyers, mandi truck, or cold warehouse storage.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center space-y-3 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 relative">
            <div className="w-12 h-12 rounded-full bg-emerald-700 text-white font-black text-lg flex items-center justify-center mx-auto shadow-sm">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900">Enter Village & Budget</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fill in your village name, required date, crop or land quantity, and your expected budget in ₹ Rupees.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center space-y-3 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 relative">
            <div className="w-12 h-12 rounded-full bg-emerald-700 text-white font-black text-lg flex items-center justify-center mx-auto shadow-sm">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900">Connect & Complete Work</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get matched with verified local providers in your village radius. Call or chat directly and get your farming job completed.
            </p>
          </div>
        </div>

        {/* Quick action banner inside */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-green-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold">Have an urgent farming requirement?</h4>
            <p className="text-xs text-emerald-100">Submit your requirement in under 60 seconds.</p>
          </div>
          <button
            onClick={() => {
              setCurrentPage('request-service');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer shrink-0"
          >
            Create Farmer Request
          </button>
        </div>
      </section>

      {/* Demonstration Banner Reminder */}
      <section className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
        <HelpCircle size={20} className="text-amber-600 shrink-0" />
        <p>
          <strong>Prototype Notice:</strong> This web application demonstrates the Rural Connect platform with sample data for Indian villages. All requests and provider interactions are stored locally in your browser session for easy demonstration.
        </p>
      </section>
    </div>
  );
};
