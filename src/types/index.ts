export type ServiceType = 
  | 'Agricultural Equipment'
  | 'Agricultural Labour'
  | 'Crop Buyers'
  | 'Crop Transportation'
  | 'Crop Storage';

export type RequestStatus = 'Open' | 'In Contact' | 'Completed';

export interface FarmerRequest {
  id: string;
  farmerName: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  serviceType: ServiceType;
  requiredDate: string;
  quantity: string;
  budget: number;
  status: RequestStatus;
  notes?: string;
  createdAt: string;
  matchedProviderName?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  businessName: string;
  village: string;
  district: string;
  state: string;
  serviceType: ServiceType;
  subServices: string[];
  price: string;
  priceUnit: string;
  numericPrice: number;
  availability: 'Available Today' | 'Available from Tomorrow' | 'Available Next Week' | 'Available on Demand';
  phone: string;
  rating: number;
  reviewsCount: number;
  completedJobs: number;
  verified: boolean;
  description: string;
  equipmentOrSpecs: string;
  experienceYears: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'farmer' | 'provider';
  village: string;
  district: string;
  state: string;
  avatar?: string;
}

export type PageView = 
  | 'home'
  | 'request-service'
  | 'find-providers'
  | 'confirmation'
  | 'view-requests'
  | 'auth';
