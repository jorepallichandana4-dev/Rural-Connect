import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { HomePage } from './pages/HomePage';
import { RequestServicePage } from './pages/RequestServicePage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { FindProvidersPage } from './pages/FindProvidersPage';
import { ViewRequestsPage } from './pages/ViewRequestsPage';
import { AuthPage } from './pages/AuthPage';
import { CheckCircle2, Info, X, PhoneCall } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentPage, notification } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'request-service':
        return <RequestServicePage />;
      case 'find-providers':
        return <FindProvidersPage />;
      case 'confirmation':
        return <ConfirmationPage />;
      case 'view-requests':
        return <ViewRequestsPage />;
      case 'auth':
        return <AuthPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7faf8] text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-950">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className={`px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border text-xs sm:text-sm font-semibold ${
            notification.type === 'success'
              ? 'bg-emerald-900 text-white border-emerald-700'
              : 'bg-slate-900 text-white border-slate-700'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            ) : (
              <Info size={18} className="text-blue-400 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar />

      {/* Main Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {renderPage()}
      </main>

      {/* Contact Provider Modal */}
      <ContactModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
