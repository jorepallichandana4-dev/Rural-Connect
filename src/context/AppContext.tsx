import React, { createContext, useContext, useState, useEffect } from 'react';
import { FarmerRequest, PageView, ServiceProvider, ServiceType, User } from '../types';
import { DEMO_USERS, INITIAL_REQUESTS } from '../data/sampleData';

interface AppContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedService: ServiceType | null;
  setSelectedService: (service: ServiceType | null) => void;
  requests: FarmerRequest[];
  addRequest: (req: Omit<FarmerRequest, 'id' | 'createdAt' | 'status'>) => FarmerRequest;
  updateRequestStatus: (id: string, status: FarmerRequest['status']) => void;
  deleteRequest: (id: string) => void;
  latestSubmittedRequest: FarmerRequest | null;
  setLatestSubmittedRequest: (req: FarmerRequest | null) => void;
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  contactProvider: ServiceProvider | null;
  setContactProvider: (provider: ServiceProvider | null) => void;
  selectedPreFillProvider: ServiceProvider | null;
  setSelectedPreFillProvider: (provider: ServiceProvider | null) => void;
  notification: { message: string; type: 'success' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'info') => void;
  navigateToService: (service: ServiceType, targetPage: 'request-service' | 'find-providers') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'rural_connect_requests_v1';
const USER_STORAGE_KEY = 'rural_connect_user_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [selectedPreFillProvider, setSelectedPreFillProvider] = useState<ServiceProvider | null>(null);
  const [contactProvider, setContactProvider] = useState<ServiceProvider | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Initialize requests from LocalStorage or default sample requests
  const [requests, setRequests] = useState<FarmerRequest[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback to initial requests
    }
    return INITIAL_REQUESTS;
  });

  // Latest submitted request for confirmation screen
  const [latestSubmittedRequest, setLatestSubmittedRequest] = useState<FarmerRequest | null>(() => {
    return requests[0] || null;
  });

  // Current user session
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch {
      // ignore
    }
    return DEMO_USERS.farmer; // Default logged in as demo farmer for seamless out-of-the-box experience
  });

  // Save requests to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(requests));
    } catch (e) {
      console.error('Failed to save requests to storage', e);
    }
  }, [requests]);

  // Save user to LocalStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save user session', e);
    }
  }, [currentUser]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  const addRequest = (data: Omit<FarmerRequest, 'id' | 'createdAt' | 'status'>): FarmerRequest => {
    const randomIdNumber = Math.floor(1000 + Math.random() * 9000);
    const newRequest: FarmerRequest = {
      ...data,
      id: `RC-${randomIdNumber}`,
      createdAt: new Date().toISOString(),
      status: 'Open',
    };

    setRequests((prev) => [newRequest, ...prev]);
    setLatestSubmittedRequest(newRequest);
    showToast(`Request #${newRequest.id} successfully created!`, 'success');
    return newRequest;
  };

  const updateRequestStatus = (id: string, status: FarmerRequest['status']) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    showToast(`Request status updated to ${status}`, 'info');
  };

  const deleteRequest = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    showToast(`Request #${id} removed`, 'info');
  };

  const login = (user: User) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out successfully', 'info');
  };

  const navigateToService = (service: ServiceType, targetPage: 'request-service' | 'find-providers') => {
    setSelectedService(service);
    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedService,
        setSelectedService,
        requests,
        addRequest,
        updateRequestStatus,
        deleteRequest,
        latestSubmittedRequest,
        setLatestSubmittedRequest,
        currentUser,
        login,
        logout,
        contactProvider,
        setContactProvider,
        selectedPreFillProvider,
        setSelectedPreFillProvider,
        notification,
        showToast,
        navigateToService,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
