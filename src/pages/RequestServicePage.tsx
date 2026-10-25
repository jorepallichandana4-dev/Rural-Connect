import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceType } from '../types';
import { SERVICE_METADATA } from '../data/sampleData';
import { ServiceIcon } from '../components/ServiceIcon';
import { 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  User, 
  IndianRupee, 
  Package, 
  FileText, 
  Phone, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const RequestServicePage: React.FC = () => {
  const { 
    selectedService, 
    setSelectedService, 
    addRequest, 
    setCurrentPage, 
    currentUser,
    selectedPreFillProvider,
    setSelectedPreFillProvider
  } = useApp();

  // Form State
  const [farmerName, setFarmerName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [village, setVillage] = useState(currentUser?.village || '');
  const [district, setDistrict] = useState(currentUser?.district || '');
  const [state, setState] = useState(currentUser?.state || 'Uttar Pradesh');
  const [serviceType, setServiceType] = useState<ServiceType>(selectedService || 'Agricultural Equipment');
  
  // Tomorrow's date as default
  const getTomorrowString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [requiredDate, setRequiredDate] = useState(getTomorrowString());
  const [quantity, setQuantity] = useState('');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState(
    selectedPreFillProvider ? `Direct request for provider: ${selectedPreFillProvider.name} (${selectedPreFillProvider.businessName})` : ''
  );

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keep serviceType in sync if selectedService changed outside
  useEffect(() => {
    if (selectedService) {
      setServiceType(selectedService);
    }
  }, [selectedService]);

  const serviceOptions: ServiceType[] = [
    'Agricultural Equipment',
    'Agricultural Labour',
    'Crop Buyers',
    'Crop Transportation',
    'Crop Storage',
  ];

  const currentMeta = SERVICE_METADATA[serviceType];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!farmerName.trim()) {
      newErrors.farmerName = 'Please enter your full name';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Please provide a contact phone number';
    } else if (phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!village.trim()) {
      newErrors.village = 'Please enter your village name';
    }

    if (!requiredDate) {
      newErrors.requiredDate = 'Please select the required date';
    } else {
      const selected = new Date(requiredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.requiredDate = 'Date cannot be in the past';
      }
    }

    if (!quantity.trim()) {
      newErrors.quantity = 'Please specify the quantity or area (e.g. 3 Acres, 5 Labourers)';
    }

    const budgetNum = Number(budget);
    if (!budget || isNaN(budgetNum) || budgetNum <= 0) {
      newErrors.budget = 'Please enter a valid estimated budget in ₹ Rupees';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Save request
    const newReq = addRequest({
      farmerName: farmerName.trim(),
      phone: phone.trim(),
      village: village.trim(),
      district: district.trim() || 'General District',
      state: state.trim() || 'India',
      serviceType: serviceType,
      requiredDate: requiredDate,
      quantity: quantity.trim(),
      budget: Number(budget),
      notes: notes.trim(),
      matchedProviderName: selectedPreFillProvider ? selectedPreFillProvider.name : undefined,
    });

    setIsSubmitting(false);
    setSelectedPreFillProvider(null);

    // Navigate to Request Confirmation Page!
    setCurrentPage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick fill demo helper
  const handleQuickDemoFill = () => {
    setFarmerName('Sukhdev Singh Bajwa');
    setPhone('+91 98141 55667');
    setVillage('Khanna Kalan');
    setDistrict('Ludhiana');
    setState('Punjab');
    setServiceType('Agricultural Equipment');
    setRequiredDate(getTomorrowString());
    setQuantity('4 Acres (Rotavator & Seeding)');
    setBudget('3800');
    setNotes('Soil prepared, need 50HP tractor with rotavator starting early 7:00 AM.');
    setErrors({});
  };

  const setQuickDate = (daysFromToday: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromToday);
    setRequiredDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          <span>Official Farmer Request Form</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Request an Agricultural Service
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Fill in your village details, required date, and quantity. Verified service providers in your tehsil will contact you directly.
        </p>
      </div>

      {/* Pre-filled Provider Indicator if booked from provider card */}
      {selectedPreFillProvider && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <ServiceIcon type={selectedPreFillProvider.serviceType} size={20} />
            </div>
            <div className="text-xs">
              <p className="text-emerald-800 font-bold">Direct Booking with Provider:</p>
              <p className="text-sm font-semibold text-slate-900">{selectedPreFillProvider.name} — {selectedPreFillProvider.businessName}</p>
              <p className="text-slate-500">{selectedPreFillProvider.village}, {selectedPreFillProvider.district} ({selectedPreFillProvider.price})</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelectedPreFillProvider(null)}
            className="text-xs text-emerald-700 hover:text-emerald-900 underline font-semibold"
          >
            Clear Direct Selection
          </button>
        </div>
      )}

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl border-2 border-emerald-100 shadow-md p-6 sm:p-10 space-y-8">
        
        {/* Quick Demo Fill Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <span className="text-xs font-semibold text-slate-500">Need to test quickly?</span>
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 transition-colors cursor-pointer"
          >
            <Sparkles size={14} className="text-emerald-600" />
            <span>Fill Sample Data</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 1. Service Type Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              1. Select Agricultural Service Type <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {serviceOptions.map((opt) => {
                const isSelected = serviceType === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setServiceType(opt);
                      setSelectedService(opt);
                    }}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <ServiceIcon type={opt} size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-bold ${isSelected ? 'text-emerald-950' : 'text-slate-900'}`}>
                        {opt}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {SERVICE_METADATA[opt].shortTitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-emerald-800 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100 flex items-center justify-between">
              <span>{currentMeta.tagline}</span>
              <span className="font-bold text-emerald-900">Rate: {currentMeta.typicalRate}</span>
            </div>
          </div>

          {/* 2. Farmer Personal & Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <User size={14} className="text-emerald-700" />
                Farmer Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={farmerName}
                onChange={(e) => {
                  setFarmerName(e.target.value);
                  if (errors.farmerName) setErrors({ ...errors, farmerName: '' });
                }}
                placeholder="e.g. Ramesh Kumar Verma"
                className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.farmerName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                }`}
              />
              {errors.farmerName && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.farmerName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Phone size={14} className="text-emerald-700" />
                Mobile Number for Contact <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                placeholder="e.g. +91 98765 43210"
                className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* 3. Location Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <MapPin size={14} className="text-emerald-700" />
                Village Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={village}
                onChange={(e) => {
                  setVillage(e.target.value);
                  if (errors.village) setErrors({ ...errors, village: '' });
                }}
                placeholder="e.g. Rampur Kalan"
                className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.village ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                }`}
              />
              {errors.village && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.village}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                District / Tehsil
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Sitapur"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                State
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Telangana">Telangana</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Bihar">Bihar</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </div>
          </div>

          {/* 4. Date, Quantity & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            
            {/* Required Date */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Calendar size={14} className="text-emerald-700" />
                Required Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                value={requiredDate}
                onChange={(e) => {
                  setRequiredDate(e.target.value);
                  if (errors.requiredDate) setErrors({ ...errors, requiredDate: '' });
                }}
                className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white ${
                  errors.requiredDate ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                }`}
              />
              <div className="flex gap-1.5 mt-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setQuickDate(0)}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-emerald-100 text-slate-700 font-medium"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDate(1)}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-emerald-100 text-slate-700 font-medium"
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDate(3)}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-emerald-100 text-slate-700 font-medium"
                >
                  In 3 Days
                </button>
              </div>
              {errors.requiredDate && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.requiredDate}
                </p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Package size={14} className="text-emerald-700" />
                Quantity / Area / Volume <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  if (errors.quantity) setErrors({ ...errors, quantity: '' });
                }}
                placeholder={currentMeta.quantityPlaceholder}
                className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.quantity ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                }`}
              />
              <span className="text-[11px] text-slate-500 block mt-1">
                E.g. acres, number of workers, or bags/quintals
              </span>
              {errors.quantity && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.quantity}
                </p>
              )}
            </div>

            {/* Budget */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <IndianRupee size={14} className="text-emerald-700" />
                Expected Budget (₹) <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="1"
                  step="50"
                  value={budget}
                  onChange={(e) => {
                    setBudget(e.target.value);
                    if (errors.budget) setErrors({ ...errors, budget: '' });
                  }}
                  placeholder={currentMeta.budgetPlaceholder}
                  className={`w-full pl-8 pr-4 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.budget ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
              </div>
              <span className="text-[11px] text-slate-500 block mt-1">
                Your target expense or sale price
              </span>
              {errors.budget && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.budget}
                </p>
              )}
            </div>

          </div>

          {/* 5. Additional Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <FileText size={14} className="text-emerald-700" />
              Special Notes / Crop Type (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Wheat field near canal road, require dry tractor attachment, prefer morning shift from 7 AM."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Submit Button & Guarantees */}
          <div className="pt-4 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle size={20} />
              <span>Submit Service Request</span>
              <ArrowRight size={18} />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1">
                <CheckCircle size={14} className="text-emerald-600" />
                100% Free for Farmers
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={14} className="text-emerald-600" />
                Direct Village Phone Connection
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={14} className="text-emerald-600" />
                Instant Prototype Confirmation
              </span>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
