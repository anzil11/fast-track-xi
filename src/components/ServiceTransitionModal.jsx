import React, { useEffect } from 'react';

export default function ServiceTransitionModal({ service, isOpen, onCompleteNavigation }) {
  useEffect(() => {
    if (isOpen && service && onCompleteNavigation) {
      onCompleteNavigation(service);
    }
  }, [isOpen, service, onCompleteNavigation]);

  return null;
}
