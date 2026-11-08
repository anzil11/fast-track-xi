import React, { lazy, Suspense, useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivacyNotice from './components/PrivacyNotice';
import ServiceTransitionModal from './components/ServiceTransitionModal';
import CustomCursor from './components/CustomCursor';
import BackgroundAnimation from './components/BackgroundAnimation';

// Eagerly loaded landing page for zero-latency initial paint
import HomePage from './pages/HomePage';

// Code-split secondary pages (loaded on demand)
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesOverviewPage = lazy(() => import('./pages/ServicesOverviewPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const NewsfeedPage = lazy(() => import('./pages/NewsfeedPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsConditionsPage = lazy(() => import('./pages/TermsConditionsPage'));

// Code-split quote calculator modal
const InteractiveQuoteCalculator = lazy(() => import('./components/InteractiveQuoteCalculator'));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
    </div>
  );
}

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
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      window.__lenis = lenis;
    }
  }, [lenis]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return (
          <Suspense fallback={<PageFallback />}>
            <AboutPage />
          </Suspense>
        );
      case 'services':
        return (
          <Suspense fallback={<PageFallback />}>
            <ServicesOverviewPage />
          </Suspense>
        );
      case 'service-detail':
        return (
          <Suspense fallback={<PageFallback />}>
            <ServiceDetailPage />
          </Suspense>
        );
      case 'careers':
        return (
          <Suspense fallback={<PageFallback />}>
            <CareersPage />
          </Suspense>
        );
      case 'newsfeed':
        return (
          <Suspense fallback={<PageFallback />}>
            <NewsfeedPage />
          </Suspense>
        );
      case 'contact':
        return (
          <Suspense fallback={<PageFallback />}>
            <ContactPage />
          </Suspense>
        );
      case 'policies':
        return (
          <Suspense fallback={<PageFallback />}>
            <PrivacyPolicyPage />
          </Suspense>
        );
      case 'terms':
        return (
          <Suspense fallback={<PageFallback />}>
            <TermsConditionsPage />
          </Suspense>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={`relative min-h-screen flex flex-col transition-colors duration-300 ${isWhite ? 'bg-white text-slate-900' : 'bg-[#07090e] text-slate-100'
      } selection:bg-brand-500 selection:text-white`}>
      {/* Dynamic Background Telemetry & Mesh Animation Setup */}
      <BackgroundAnimation />

      {/* Modern Interactive Mouse Pointer Animation */}
      <CustomCursor />

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

      {/* Interactive Quote Calculator Modal (Mounted only when open) */}
      {isQuoteModalOpen && (
        <Suspense fallback={null}>
          <InteractiveQuoteCalculator
            isOpen={isQuoteModalOpen}
            onClose={() => setIsQuoteModalOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false
      }}
    >
      <ThemeProvider>
        <NavigationProvider>
          <MainContent />
        </NavigationProvider>
      </ThemeProvider>
    </ReactLenis>
  );
}
