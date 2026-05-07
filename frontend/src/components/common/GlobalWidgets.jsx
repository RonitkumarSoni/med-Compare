import React from 'react';
import ChatWidget from './ChatWidget';
import WhatsAppButton from './WhatsAppButton';

const GlobalWidgets = () => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[9999] flex flex-col gap-3 md:gap-4 items-end">
      <ChatWidget />
      <WhatsAppButton />
    </div>
  );
};

export default GlobalWidgets;
