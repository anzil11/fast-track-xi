import React, { createContext, useContext, useState, useEffect } from 'react';
import { servicesData } from '../data/servicesData';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'about', 'services', 'service-detail', 'careers', 'newsfeed', 'contact', 'policies', 'terms'
  const [selectedService, setSelectedService] = useState(servicesData[0]);
  const [isTransitionModalOpen, setIsTransitionModalOpen] = useState(false);
  const [transitioningService, setTransitioningService] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedNewsArticle, setSelectedNewsArticle] = useState(null);

  // Sync with browser URL / hash for natural deep-linking
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path.startsWith('/services/')) {
        const slug = path.replace('/services/', '');
        const found = servicesData.find(s => s.slug === slug);
        if (found) {
          setSelectedService(found);
          setCurrentPage('service-detail');
        } else {
          setCurrentPage('services');
        }
      } else if (path === '/services') {
        setCurrentPage('services');
      } else if (path === '/about') {
        setCurrentPage('about');
      } else if (path === '/careers') {
        setCurrentPage('careers');
      } else if (path === '/newsfeed') {
        setCurrentPage('newsfeed');
      } else if (path === '/contact' || hash === '#contact') {
        setCurrentPage('contact');
      } else if (path === '/policies') {
        setCurrentPage('policies');
      } else if (path === '/terms-conditions' || path === '/terms') {
        setCurrentPage('terms');
      } else {
        setCurrentPage('home');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Method to navigate with smooth scroll to top
  const navigateTo = (page, service = null, hash = '') => {
    let url = '/';
    if (page === 'service-detail' && service) {
      url = `/services/${service.slug}`;
      setSelectedService(service);
      window.history.pushState({}, '', url);
      setCurrentPage('service-detail');
    } else if (page === 'services') {
      url = '/services' + (hash ? `#${hash}` : '');
      window.history.pushState({}, '', url);
      setCurrentPage('services');
    } else if (page === 'about') {
      url = '/about';
      window.history.pushState({}, '', url);
      setCurrentPage('about');
    } else if (page === 'careers') {
      url = '/careers';
      window.history.pushState({}, '', url);
      setCurrentPage('careers');
    } else if (page === 'newsfeed') {
      url = '/newsfeed';
      window.history.pushState({}, '', url);
      setCurrentPage('newsfeed');
    } else if (page === 'contact') {
      url = '/#contact';
      window.history.pushState({}, '', url);
      setCurrentPage('contact');
    } else if (page === 'policies') {
      url = '/policies';
      window.history.pushState({}, '', url);
      setCurrentPage('policies');
    } else if (page === 'terms') {
      url = '/terms-conditions';
      window.history.pushState({}, '', url);
      setCurrentPage('terms');
    } else {
      url = '/' + (hash ? `#${hash}` : '');
      window.history.pushState({}, '', url);
      setCurrentPage('home');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // The KILLER FEATURE trigger:
  // User clicks on a service card -> triggers animated transition modal -> completes and routes
  const triggerServiceTransition = (service) => {
    setTransitioningService(service);
    setIsTransitionModalOpen(true);
  };

  const completeServiceTransition = (service) => {
    setIsTransitionModalOpen(false);
    setTransitioningService(null);
    navigateTo('service-detail', service);
  };

  const closeTransitionModal = () => {
    setIsTransitionModalOpen(false);
    setTransitioningService(null);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        selectedService,
        setSelectedService,
        navigateTo,
        triggerServiceTransition,
        isTransitionModalOpen,
        transitioningService,
        completeServiceTransition,
        closeTransitionModal,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        selectedNewsArticle,
        setSelectedNewsArticle
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
