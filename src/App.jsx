import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivacyNotice from './components/PrivacyNotice';
import ServiceTransitionModal from './components/ServiceTransitionModal';
import InteractiveQuoteCalculator from './components/InteractiveQuoteCalculator';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesOverviewPage from './pages/ServicesOverviewPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import CareersPage from './pages/CareersPage';
import NewsfeedPage from './pages/NewsfeedPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';

function MainContent() {
  const {
    currentPage,
    isTransitionModalOpen,
    transitioningService,
    completeServiceTransition,
    closeTransitionModal,
    isQuoteModalOpen,
    setIsQuoteModalOpen
  } = useNavigation();

  const { isWhite } = useTheme();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesOverviewPage />;
      case 'service-detail':
        return <ServiceDetailPage />;
      case 'careers':
        return <CareersPage />;
      case 'newsfeed':
        return <NewsfeedPage />;
      case 'contact':
        return <ContactPage />;
      case 'policies':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsConditionsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={`relative min-h-screen flex flex-col transition-colors duration-300 ${isWhite ? 'bg-white text-slate-900' : 'bg-[#07090e] text-slate-100'
      } selection:bg-brand-500 selection:text-white`}>
      {/* Top Navbar */}
      <Navbar />

      {/* Main Active Page */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Privacy Consent Notice */}
      <PrivacyNotice />

      {/* Master Service-Specific Transition Animation Modal */}
      <ServiceTransitionModal
        isOpen={isTransitionModalOpen}
        service={transitioningService}
        onClose={closeTransitionModal}
        onCompleteNavigation={completeServiceTransition}
      />

      {/* Interactive Quote Calculator Modal */}
      <InteractiveQuoteCalculator
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <MainContent />
      </NavigationProvider>
    </ThemeProvider>
  );
}
