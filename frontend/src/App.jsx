import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Lenis from 'lenis';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes';

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <ToastContainer position="bottom-right" theme="dark" />
      <AppRoutes />
    </Router>
  );
}

export default App;
