import React from 'react';
import { useApp } from '../context/AppContext';
import { ServiceIcon } from '../components/ServiceIcon';
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Package, 
  IndianRupee, 
  Phone, 
  User, 
  ArrowRight, 
  Search, 
  PlusCircle, 
  Printer, 
  Share2, 
  Clock,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

export const ConfirmationPage: React.FC = () => {
  const { latestSubmittedRequest, setCurrentPage, setSelectedService, showToast } = useApp();

  // If no request exists yet, fallback politely
  if (!latestSubmittedRequest) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm space-y-4">
        <FileCheck size={48} className="mx-auto text-emerald-600" />
        <h2 className="text-2xl font-bold text-slate-800">No Recent Request Found</h2>
        <p className="text-sm text-slate-600">
          You haven't submitted a request in this session yet. Submit your farming needs using our simple request form.
        </p>
        <button
          onClick={() => setCurrentPage('request-service')}
          className="px-6 py-3 bg-emerald-700 text-white rounded-xl font-bold text-sm hover:bg-emerald-800 transition-colors cursor-pointer"
        >
          Submit a Request Now
        </button>
      </div>
    );
  }

  const req = latestSubmittedRequest;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    showToast(`Request reference #${req.id} copied to clipboard!`, 'success');
  };

  const handleFindMatchingProviders = () => {
    setSelectedService(req.serviceType);
    setCurrentPage('find-providers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Success Hero Header */}
      <div className="bg-gradient-to-b from-emerald-800 to-emerald-900 text-white rounded-3xl p-8 sm:p-10 text-center shadow-lg relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/30 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4 text-emerald-300">
          <CheckCircle2 size={36} className="text-emerald-300" />
        </div>
        <span className="inline-block px-3 py-1 bg-emerald-700/80 text-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          Request Submitted Successfully
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Thank You, {req.farmerName}!
        </h1>
        <p className="text-sm sm:text-base text-emerald-200 max-w-lg mx-auto mt-2">
          Your request for <strong className="text-white">{req.serviceType}</strong> has been registered in the Rural Connect village network.
        </p>

        {/* Reference ID Pill */}
        <div className="mt-5 inline-flex items-center gap-3 bg-emerald-950/80 px-5 py-2.5 rounded-2xl border border-emerald-700">
          <span className="text-xs text-emerald-300 uppercase tracking-wider font-semibold">Reference ID:</span>
          <span className="text-lg font-black text-amber-300 font-mono tracking-wider">#{req.id}</span>
        </div>
      </div>

      {/* Request Details Breakdown Card */}
      <div className="bg-white rounded-3xl border-2 border-emerald-100 shadow-sm overflow-hidden">
        
        {/* Card Header */}
        <div className="p-6 bg-emerald-50/70 border-b border-emerald-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <ServiceIcon type={req.serviceType} size={24} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Service Category</span>
              <h2 className="text-lg font-black text-slate-900">{req.serviceType}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Printer size={14} />
              <span>Print Slip</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Share2 size={14} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Grid of Submitted Details */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Farmer & Contact */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <User size={13} className="text-emerald-700" /> Farmer Name
            </span>
            <p className="text-base font-bold text-slate-900">{req.farmerName}</p>
            <p className="text-xs text-slate-600 flex items-center gap-1 pt-0.5">
              <Phone size={12} className="text-slate-400" /> {req.phone}
            </p>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MapPin size={13} className="text-emerald-700" /> Village & District
            </span>
            <p className="text-base font-bold text-slate-900">{req.village}</p>
            <p className="text-xs text-slate-600">
              {req.district}, {req.state}
            </p>
          </div>

          {/* Date Required */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Calendar size={13} className="text-emerald-700" /> Required Date
            </span>
            <p className="text-base font-bold text-slate-900">
              {new Date(req.requiredDate).toLocaleDateString('en-IN', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </p>
            <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-1">
              <Clock size={11} /> Scheduled for work
            </span>
          </div>

          {/* Quantity */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Package size={13} className="text-emerald-700" /> Quantity / Scope
            </span>
            <p className="text-base font-bold text-slate-900">{req.quantity}</p>
            <span className="text-xs text-slate-500">Specified by farmer</span>
          </div>

          {/* Budget */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <IndianRupee size={13} className="text-emerald-700" /> Estimated Budget
            </span>
            <p className="text-xl font-black text-emerald-800">
              ₹{req.budget.toLocaleString('en-IN')}
            </p>
            <span className="text-[11px] text-slate-500">Pay directly to provider</span>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck size={13} className="text-emerald-700" /> Request Status
            </span>
            <div className="pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                {req.status} – Open for Providers
              </span>
            </div>
            <span className="text-[11px] text-slate-500 block pt-0.5">Visible to local providers</span>
          </div>

        </div>

        {/* Notes if any */}
        {req.notes && (
          <div className="px-6 sm:px-8 pb-6 border-t border-slate-100 pt-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Special Instructions / Crop Details:
            </span>
            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {req.notes}
            </p>
          </div>
        )}

        {/* Direct provider notification if matched */}
        {req.matchedProviderName && (
          <div className="mx-6 sm:mx-8 mb-6 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>Direct booking request linked with: <strong>{req.matchedProviderName}</strong></span>
          </div>
        )}

      </div>

      {/* Next Steps Guidance */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">What Happens Next?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="font-bold text-emerald-800 block text-sm">Step 1</span>
            <p className="font-semibold text-slate-900">Broadcast to Village Radius</p>
            <p className="text-slate-600 leading-relaxed">
              Your request is displayed on the Rural Connect requests board for your district.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="font-bold text-emerald-800 block text-sm">Step 2</span>
            <p className="font-semibold text-slate-900">Direct Phone Discussion</p>
            <p className="text-slate-600 leading-relaxed">
              Available operators and providers call your phone to verify timing and machine specifications.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <span className="font-bold text-emerald-800 block text-sm">Step 3</span>
            <p className="font-semibold text-slate-900">Execution & Direct Pay</p>
            <p className="text-slate-600 leading-relaxed">
              Service is performed on your farm. Pay the agreed rate directly without any hidden fee.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={handleFindMatchingProviders}
          className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Search size={18} />
          <span>Find Matching Providers Now</span>
        </button>

        <button
          onClick={() => {
            setCurrentPage('view-requests');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-emerald-50 text-emerald-900 text-sm font-bold rounded-xl border border-emerald-300 shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>View All Farmer Requests</span>
          <ArrowRight size={18} />
        </button>

        <button
          onClick={() => {
            setCurrentPage('request-service');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full sm:w-auto px-4 py-3.5 text-xs text-slate-600 hover:text-slate-900 font-semibold"
        >
          + Submit Another Request
        </button>
      </div>

    </div>
  );
};
