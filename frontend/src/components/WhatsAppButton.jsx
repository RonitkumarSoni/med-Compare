import React from 'react';

const WhatsAppButton = ({ phoneNumber = "918738030604", message = "Hello MedCompare, I need some help." }) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl shadow-[#25D366]/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative z-50"
      aria-label="Chat on WhatsApp"
    >
      <i className="fa-brands fa-whatsapp text-3xl"></i>
      
      {/* Tooltip */}
      <span className="absolute right-20 bg-slate-900 text-white text-xs font-bold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-headline">
        Chat with us
        {/* Triangle Arrow */}
        <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900 transform rotate-45"></span>
      </span>
    </a>
  );
};

export default WhatsAppButton;
