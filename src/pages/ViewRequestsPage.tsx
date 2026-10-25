import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FarmerRequest, RequestStatus, ServiceType } from '../types';
import { ServiceIcon } from '../components/ServiceIcon';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  IndianRupee, 
  PlusCircle, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Clock, 
  CheckCircle2, 
  X,
  Phone,
  User,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const ViewRequestsPage: React.FC = () => {
  const { requests, updateRequestStatus, deleteRequest, setCurrentPage, setLatestSubmittedRequest } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<ServiceType | 'All'>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<RequestStatus | 'All'>('All');
  const [detailModalRequest, setDetailModalRequest] = useState<FarmerRequest | null>(null);

  // Filtered requests list
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      // Service filter
      if (selectedServiceFilter !== 'All' && req.serviceType !== selectedServiceFilter) {
        return false;
      }

      // Status filter
      if (selectedStatusFilter !== 'All' && req.status !== selectedStatusFilter) {
        return false;
      }

      // Search query (Farmer name, village, district, ID, notes)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = req.farmerName.toLowerCase().includes(query);
        const matchesVillage = req.village.toLowerCase().includes(query);
        const matchesDistrict = req.district.toLowerCase().includes(query);
        const matchesId = req.id.toLowerCase().includes(query);
        const matchesNotes = req.notes ? req.notes.toLowerCase().includes(query) : false;

        if (!matchesName && !matchesVillage && !matchesDistrict && !matchesId && !matchesNotes) {
          return false;
        }
      }

      return true;
    });
  }, [requests, selectedServiceFilter, selectedStatusFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = requests.length;
    const openCount = requests.filter((r) => r.status === 'Open').length;
    const inContactCount = requests.filter((r) => r.status === 'In Contact').length;
    const completedCount = requests.filter((r) => r.status === 'Completed').length;
    const totalBudget = requests.reduce((acc, r) => acc + (r.budget || 0), 0);
    return { total, openCount, inContactCount, completedCount, totalBudget };
  }, [requests]);

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'Open':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Open
          </span>
        );
      case 'In Contact':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-300">
            <Clock size={12} className="text-blue-600" />
            In Contact
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-300">
            <CheckCircle2 size={12} className="text-emerald-600" />
            Completed
          </span>
        );
    }
  };

  const handleOpenDetail = (req: FarmerRequest) => {
    setDetailModalRequest(req);
  };

  const handlePrintSlip = (req: FarmerRequest) => {
    setLatestSubmittedRequest(req);
    setCurrentPage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      
      {/* Header & New Request button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            <span>Community Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            All Farmer Service Requests
          </h1>
          <p className="text-sm text-slate-600 max-w-xl">
            Live requests broadcasted by farmers across rural India. Service providers can view equipment, labour, and transport requirements.
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentPage('request-service');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs shadow-md transition-all self-start md:self-auto cursor-pointer"
        >
          <PlusCircle size={16} />
          <span>Post New Request</span>
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block">Total Requests</span>
          <span className="text-2xl font-black text-slate-900">{stats.total}</span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Across all Indian states</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
          <span className="text-xs text-amber-700 font-semibold block">Open Needs</span>
          <span className="text-2xl font-black text-amber-600">{stats.openCount}</span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Awaiting provider response</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
          <span className="text-xs text-blue-700 font-semibold block">In Contact</span>
          <span className="text-2xl font-black text-blue-600">{stats.inContactCount}</span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Discussions ongoing</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
          <span className="text-xs text-emerald-700 font-semibold block">Completed</span>
          <span className="text-2xl font-black text-emerald-600">{stats.completedCount}</span>
          <span className="text-[11px] text-slate-400 block mt-0.5">Successfully served</span>
        </div>
      </div>

      {/* Filters & Search Control Card */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-100 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search box */}
          <div className="md:col-span-6 relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by farmer name, village (e.g. Khanna, Dudu), or ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-slate-900 placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Service Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedServiceFilter}
              onChange={(e) => setSelectedServiceFilter(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Services (5)</option>
              <option value="Agricultural Equipment">Agricultural Equipment</option>
              <option value="Agricultural Labour">Agricultural Labour</option>
              <option value="Crop Buyers">Crop Buyers</option>
              <option value="Crop Transportation">Crop Transportation</option>
              <option value="Crop Storage">Crop Storage</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Contact">In Contact</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Requests Table (Desktop) & Cards (Mobile) */}
      {filteredRequests.length > 0 ? (
        <div className="space-y-4">
          
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-3xl border-2 border-emerald-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-800 text-white text-xs uppercase tracking-wider">
                  <th className="py-4 px-5 font-bold">Request ID</th>
                  <th className="py-4 px-5 font-bold">Farmer Name</th>
                  <th className="py-4 px-5 font-bold">Village & District</th>
                  <th className="py-4 px-5 font-bold">Service Type</th>
                  <th className="py-4 px-5 font-bold">Required Date</th>
                  <th className="py-4 px-5 font-bold">Quantity</th>
                  <th className="py-4 px-5 font-bold">Budget (₹)</th>
                  <th className="py-4 px-5 font-bold">Status</th>
                  <th className="py-4 px-5 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-emerald-50/40 transition-colors">
                    
                    {/* ID */}
                    <td className="py-4 px-5 font-mono font-bold text-slate-800">
                      #{req.id}
                    </td>

                    {/* Farmer */}
                    <td className="py-4 px-5">
                      <div className="font-bold text-slate-900 text-sm">{req.farmerName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone size={11} /> {req.phone}
                      </div>
                    </td>

                    {/* Village */}
                    <td className="py-4 px-5">
                      <div className="font-semibold text-slate-900 flex items-center gap-1">
                        <MapPin size={12} className="text-emerald-700 shrink-0" />
                        <span>{req.village}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">{req.district}, {req.state}</div>
                    </td>

                    {/* Service */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                          <ServiceIcon type={req.serviceType} size={15} />
                        </div>
                        <span className="font-semibold text-slate-800">{req.serviceType}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-5 font-medium text-slate-700 whitespace-nowrap">
                      {new Date(req.requiredDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>

                    {/* Quantity */}
                    <td className="py-4 px-5 font-semibold text-slate-900">
                      {req.quantity}
                    </td>

                    {/* Budget */}
                    <td className="py-4 px-5 font-black text-emerald-800 text-sm whitespace-nowrap">
                      ₹{req.budget.toLocaleString('en-IN')}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5">
                      <select
                        value={req.status}
                        onChange={(e) => updateRequestStatus(req.id, e.target.value as RequestStatus)}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1 border transition-colors cursor-pointer ${
                          req.status === 'Open'
                            ? 'bg-amber-50 text-amber-900 border-amber-300'
                            : req.status === 'In Contact'
                            ? 'bg-blue-50 text-blue-900 border-blue-300'
                            : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        }`}
                      >
                        <option value="Open">Open</option>
                        <option value="In Contact">In Contact</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenDetail(req)}
                          title="View Details"
                          className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => deleteRequest(req.id)}
                          title="Delete Request"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile & Tablet Card Layout */}
          <div className="lg:hidden space-y-4">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl border-2 border-emerald-100 shadow-xs p-5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <ServiceIcon type={req.serviceType} size={20} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-slate-400">#{req.id}</span>
                      <h3 className="text-base font-bold text-slate-900">{req.farmerName}</h3>
                    </div>
                  </div>

                  <div>
                    {getStatusBadge(req.status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Service</span>
                    <span className="font-semibold text-slate-900">{req.serviceType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Village</span>
                    <span className="font-semibold text-slate-900">{req.village}, {req.district}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Required Date</span>
                    <span className="font-semibold text-slate-900">
                      {new Date(req.requiredDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Budget</span>
                    <span className="font-bold text-emerald-800">₹{req.budget.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 font-semibold">Quantity: </span>
                  <span className="font-bold text-slate-800">{req.quantity}</span>
                </div>

                {/* Status Switcher & Action buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-medium">Status:</span>
                    <select
                      value={req.status}
                      onChange={(e) => updateRequestStatus(req.id, e.target.value as RequestStatus)}
                      className="text-xs font-bold rounded-lg px-2 py-1 border border-slate-300 bg-white"
                    >
                      <option value="Open">Open</option>
                      <option value="In Contact">In Contact</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenDetail(req)}
                      className="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold hover:bg-emerald-100"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => deleteRequest(req.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-emerald-100 shadow-sm max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Search size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Farmer Requests Found</h3>
          <p className="text-xs text-slate-600">
            No requests matched your search query or filter combination. You can reset filters or create a new request right now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
            <button
              onClick={() => {
                setSelectedServiceFilter('All');
                setSelectedStatusFilter('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
            <button
              onClick={() => {
                setCurrentPage('request-service');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Post a Service Request
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal for Selected Request */}
      {detailModalRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-emerald-800 text-white p-5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-700 flex items-center justify-center text-white">
                  <ServiceIcon type={detailModalRequest.serviceType} size={22} />
                </div>
                <div>
                  <span className="text-xs text-emerald-200 font-mono">#{detailModalRequest.id}</span>
                  <h3 className="text-lg font-bold text-white">{detailModalRequest.farmerName}</h3>
                  <p className="text-xs text-emerald-200">{detailModalRequest.village}, {detailModalRequest.district}</p>
                </div>
              </div>
              <button
                onClick={() => setDetailModalRequest(null)}
                className="text-emerald-200 hover:text-white p-1 rounded-lg"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <div>
                  <span className="text-slate-400 block text-[11px]">Service Requested</span>
                  <span className="font-bold text-slate-900 text-sm">{detailModalRequest.serviceType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Target Budget</span>
                  <span className="font-bold text-emerald-900 text-base">₹{detailModalRequest.budget.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Required Date</span>
                  <span className="font-semibold text-slate-900">{detailModalRequest.requiredDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Quantity</span>
                  <span className="font-semibold text-slate-900">{detailModalRequest.quantity}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] mb-1">Contact Phone:</span>
                <p className="text-sm font-bold text-slate-900">{detailModalRequest.phone}</p>
              </div>

              {detailModalRequest.notes && (
                <div>
                  <span className="text-slate-400 block text-[11px] mb-1">Notes:</span>
                  <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 leading-relaxed">
                    {detailModalRequest.notes}
                  </p>
                </div>
              )}

              {/* Status updater in modal */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="font-semibold text-slate-700">Change Status:</span>
                <div className="flex gap-1.5">
                  {(['Open', 'In Contact', 'Completed'] as RequestStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        updateRequestStatus(detailModalRequest.id, st);
                        setDetailModalRequest({ ...detailModalRequest, status: st });
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                        detailModalRequest.status === st
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    handlePrintSlip(detailModalRequest);
                    setDetailModalRequest(null);
                  }}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-center cursor-pointer"
                >
                  View Full Slip & Confirmation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
