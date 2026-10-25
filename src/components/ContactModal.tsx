import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Phone, MessageSquare, CheckCircle, ShieldCheck, MapPin, Calendar, IndianRupee, ArrowRight } from 'lucide-react';
import { ServiceIcon } from './ServiceIcon';

export const ContactModal: React.FC = () => {
  const { contactProvider, setContactProvider, setSelectedService, setSelectedPreFillProvider, setCurrentPage, showToast } = useApp();
  const [callInitiated, setCallInitiated] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  if (!contactProvider) return null;

  const handleSimulateCall = () => {
    setCallInitiated(true);
    showToast(`Simulating call to ${contactProvider.name} (${contactProvider.phone})`, 'info');
  };

  const handleSimulateWhatsApp = () => {
    setMessageSent(true);
    showToast(`Simulated WhatsApp message sent to ${contactProvider.name}`, 'success');
  };

  const handleBookDirectly = () => {
    setSelectedService(contactProvider.serviceType);
    setSelectedPreFillProvider(contactProvider);
    setContactProvider(null);
    setCurrentPage('request-service');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-emerald-800 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-700/80 border border-emerald-600 flex items-center justify-center text-emerald-100">
              <ServiceIcon type={contactProvider.serviceType} size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">{contactProvider.serviceType}</span>
                {contactProvider.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-700 text-emerald-100 px-2 py-0.5 rounded-sm">
                    <ShieldCheck size={12} /> Verified
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">{contactProvider.name}</h3>
              <p className="text-sm text-emerald-100 font-medium">{contactProvider.businessName}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setContactProvider(null);
              setCallInitiated(false);
              setMessageSent(false);
            }}
            className="text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-emerald-700 transition-colors"
            aria-label="Close dialog"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Location & Rate Info */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 text-xs text-slate-700">
            <div>
              <span className="text-emerald-800 font-semibold block mb-0.5 flex items-center gap-1">
                <MapPin size={13} className="text-emerald-600" /> Location
              </span>
              <p className="font-medium text-slate-800">{contactProvider.village}, {contactProvider.district}</p>
              <p className="text-slate-500">{contactProvider.state}</p>
            </div>
            <div>
              <span className="text-emerald-800 font-semibold block mb-0.5 flex items-center gap-1">
                <IndianRupee size={13} className="text-emerald-600" /> Quoted Rate
              </span>
              <p className="text-base font-bold text-emerald-900">{contactProvider.price}</p>
              <p className="text-slate-500 text-[11px] leading-tight">{contactProvider.priceUnit}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">About Service</h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
              {contactProvider.description}
            </p>
          </div>

          {/* Equipment / Specs */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Available Fleet / Capacity</h4>
            <p className="text-xs font-medium text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200">
              {contactProvider.equipmentOrSpecs}
            </p>
          </div>

          {/* Interactive Simulation Actions */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Direct Contact Options</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Phone call */}
              <button
                onClick={handleSimulateCall}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 text-white font-medium hover:bg-emerald-800 transition-colors shadow-sm cursor-pointer"
              >
                <Phone size={18} />
                <span>{callInitiated ? 'Calling ' + contactProvider.phone : 'Direct Phone Call'}</span>
              </button>

              {/* WhatsApp / SMS */}
              <button
                onClick={handleSimulateWhatsApp}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 font-medium hover:bg-emerald-200 transition-colors cursor-pointer"
              >
                <MessageSquare size={18} className="text-emerald-700" />
                <span>{messageSent ? 'Inquiry Sent' : 'Send SMS / WhatsApp'}</span>
              </button>
            </div>

            {/* Direct Book Shortcut */}
            <button
              onClick={handleBookDirectly}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors border border-slate-300 cursor-pointer"
            >
              <span>Create Official Service Request for this Provider</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Active Call / Message feedback feedback */}
          {callInitiated && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2.5 text-xs text-emerald-900">
              <CheckCircle size={18} className="text-emerald-600 shrink-0" />
              <div>
                <p className="font-semibold">Simulated Call Active</p>
                <p className="text-emerald-700">Connecting you with {contactProvider.name} at {contactProvider.phone}. No intermediary commission.</p>
              </div>
            </div>
          )}

          {messageSent && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2.5 text-xs text-blue-900">
              <CheckCircle size={18} className="text-blue-600 shrink-0" />
              <div>
                <p className="font-semibold">Inquiry Prepared</p>
                <p className="text-blue-700">"Namaste {contactProvider.name}, requesting {contactProvider.serviceType} in your village circle."</p>
              </div>
            </div>
          )}

          {/* Demonstration Notice */}
          <p className="text-[11px] text-slate-500 text-center border-t border-slate-100 pt-3">
            <span className="font-semibold text-slate-600">Sample Demonstration:</span> Provider details are realistic demonstration records. In this prototype, actions simulate communication without sending live telecommunication signals.
          </p>
        </div>
      </div>
    </div>
  );
};
