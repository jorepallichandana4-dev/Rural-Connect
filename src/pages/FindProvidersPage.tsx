import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceType, ServiceProvider } from '../types';
import { SAMPLE_PROVIDERS, SERVICE_METADATA } from '../data/sampleData';
import { ServiceIcon } from '../components/ServiceIcon';
import { 
  Search, 
  MapPin, 
  Phone, 
  Star, 
  ShieldCheck, 
  IndianRupee, 
  CheckCircle, 
  Filter, 
  ArrowUpDown, 
  Info,
  CalendarCheck,
  ChevronRight,
  PlusCircle
} from 'lucide-react';

export const FindProvidersPage: React.FC = () => {
  const { selectedService, setSelectedService, setContactProvider, setCurrentPage, setSelectedPreFillProvider } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeServiceFilter, setActiveServiceFilter] = useState<ServiceType | 'All'>(selectedService || 'All');
  const [availabilityFilter, setAvailabilityFilter] = useState<'All' | 'Today' | 'Tomorrow'>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'priceAsc' | 'jobs'>('rating');

  const serviceCategories: (ServiceType | 'All')[] = [
    'All',
    'Agricultural Equipment',
    'Agricultural Labour',
    'Crop Buyers',
    'Crop Transportation',
    'Crop Storage',
  ];

  // Filter & Sort Logic
  const filteredProviders = useMemo(() => {
    return SAMPLE_PROVIDERS.filter((provider) => {
      // Service filter
      if (activeServiceFilter !== 'All' && provider.serviceType !== activeServiceFilter) {
        return false;
      }

      // Search query (name, business, village, district, state, equipment)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = provider.name.toLowerCase().includes(query);
        const matchesBusiness = provider.businessName.toLowerCase().includes(query);
        const matchesVillage = provider.village.toLowerCase().includes(query);
        const matchesDistrict = provider.district.toLowerCase().includes(query);
        const matchesState = provider.state.toLowerCase().includes(query);
        const matchesSpecs = provider.equipmentOrSpecs.toLowerCase().includes(query);
        const matchesSubServices = provider.subServices.some(s => s.toLowerCase().includes(query));

        if (!matchesName && !matchesBusiness && !matchesVillage && !matchesDistrict && !matchesState && !matchesSpecs && !matchesSubServices) {
          return false;
        }
      }

      // Availability filter
      if (availabilityFilter === 'Today' && provider.availability !== 'Available Today') {
        return false;
      }
      if (availabilityFilter === 'Tomorrow' && (provider.availability !== 'Available Today' && provider.availability !== 'Available from Tomorrow')) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'priceAsc') {
        return a.numericPrice - b.numericPrice;
      } else if (sortBy === 'jobs') {
        return b.completedJobs - a.completedJobs;
      }
      return 0;
    });
  }, [activeServiceFilter, searchQuery, availabilityFilter, sortBy]);

  const handleSelectServiceFilter = (service: ServiceType | 'All') => {
    setActiveServiceFilter(service);
    if (service !== 'All') {
      setSelectedService(service);
    } else {
      setSelectedService(null);
    }
  };

  const handleDirectBook = (provider: ServiceProvider) => {
    setSelectedService(provider.serviceType);
    setSelectedPreFillProvider(provider);
    setCurrentPage('request-service');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            <span>Verified Rural Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Find Agricultural Service Providers
          </h1>
          <p className="text-sm text-slate-600 max-w-xl">
            Browse verified tractor operators, harvest labour leaders, mandi crop buyers, logistics drivers, and cold storage units across rural India.
          </p>
        </div>

        {/* Post Request button */}
        <button
          onClick={() => {
            setCurrentPage('request-service');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs shadow-md transition-all self-start md:self-auto cursor-pointer"
        >
          <PlusCircle size={16} />
          <span>Post Custom Need Instead</span>
        </button>
      </div>

      {/* Demonstration Banner */}
      <div className="p-3.5 bg-emerald-50/90 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-start sm:items-center gap-3">
        <Info size={18} className="text-emerald-700 shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <span className="font-bold">Demonstration Directory:</span> The listings below are clearly identified sample providers across Indian states. In this prototype, clicking "Contact" initiates a simulated direct phone and SMS inquiry.
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-100 shadow-sm space-y-4">
        
        {/* Top Search Input & Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search box */}
          <div className="md:col-span-6 relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by village, district (e.g. Ludhiana, Nashik), provider name or machine..."
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

          {/* Availability Filter */}
          <div className="md:col-span-3">
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Availability</option>
              <option value="Today">Available Today</option>
              <option value="Tomorrow">Available within 24 Hours</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="rating">Sort by: Highest Rating ⭐</option>
              <option value="priceAsc">Sort by: Lowest Price (₹)</option>
              <option value="jobs">Sort by: Most Jobs Completed</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills (Functional Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {serviceCategories.map((cat) => {
            const isActive = activeServiceFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => handleSelectServiceFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat !== 'All' && <ServiceIcon type={cat} size={14} />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Results Count & Current Filter Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredProviders.length}</strong> verified rural providers
          {activeServiceFilter !== 'All' && ` in "${activeServiceFilter}"`}
        </span>
        {filteredProviders.length === 0 && (
          <button
            onClick={() => {
              setActiveServiceFilter('All');
              setSearchQuery('');
              setAvailabilityFilter('All');
            }}
            className="text-emerald-700 hover:underline font-semibold"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Provider Cards Grid */}
      {filteredProviders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-2xl border-2 border-emerald-100/80 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
            >
              {/* Card Body */}
              <div className="p-5 space-y-4">
                
                {/* Header: Service Tag & Availability */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <ServiceIcon type={provider.serviceType} size={20} />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                        {provider.serviceType}
                      </span>
                      <span className="text-[11px] text-slate-400">Sample Demo Profile</span>
                    </div>
                  </div>

                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    provider.availability === 'Available Today'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    <CalendarCheck size={11} />
                    {provider.availability}
                  </span>
                </div>

                {/* Name & Business */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-slate-900 truncate">
                      {provider.name}
                    </h3>
                    {provider.verified && (
                      <span title="Verified Provider">
                        <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                    {provider.businessName}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <MapPin size={14} className="text-emerald-600 shrink-0" />
                  <span>
                    <strong>{provider.village}</strong>, {provider.district}, {provider.state}
                  </span>
                </div>

                {/* Pricing Box */}
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                    Transparent Quoted Rate
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xl font-black text-emerald-900">{provider.price}</span>
                    <span className="text-xs text-slate-600">{provider.priceUnit}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {provider.description}
                </p>

                {/* Equipment / Specs preview */}
                <div className="text-[11px] bg-slate-50 p-2 rounded-lg border border-slate-100 text-slate-700">
                  <span className="font-bold text-slate-800">Specs / Capacity: </span>
                  <span className="truncate">{provider.equipmentOrSpecs}</span>
                </div>

                {/* Ratings & Jobs info */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span>{provider.rating}</span>
                    <span className="text-slate-400 font-normal">({provider.reviewsCount})</span>
                  </div>
                  <span>{provider.completedJobs} jobs done</span>
                </div>

              </div>

              {/* Card Action Buttons */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setContactProvider(provider)}
                  className="w-full py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Phone size={14} />
                  <span>Contact</span>
                </button>

                <button
                  onClick={() => handleDirectBook(provider)}
                  className="w-full py-2.5 px-3 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Book Request</span>
                  <ChevronRight size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-emerald-100 shadow-sm max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Search size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Providers Match Your Criteria</h3>
          <p className="text-xs text-slate-600">
            We couldn't find any demonstration providers for the chosen service or location. Try clearing filters or submit a new request.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
            <button
              onClick={() => {
                setActiveServiceFilter('All');
                setSearchQuery('');
                setAvailabilityFilter('All');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={() => {
                setCurrentPage('request-service');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Post a Service Request
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
