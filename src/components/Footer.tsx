import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white shadow-lg py-4 text-center border-t border-gray-200 z-50 fixed bottom-0">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} Snappy Friends. Todos los derechos reservados.
      </p>
     
    </footer>
  );
};

export default Footer;
