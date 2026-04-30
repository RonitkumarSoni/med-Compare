import React from 'react';
import ChatWidget from './ChatWidget';
import WhatsAppButton from './WhatsAppButton';

const GlobalWidgets = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-4 items-end">
      <ChatWidget />
      <WhatsAppButton />
    </div>
  );
};

export default GlobalWidgets;
