import { type ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Logo from "@/assets/icons/Logo"; // SVG component

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page/content loading
    const timer = setTimeout(() => setLoading(false), 2000); // replace with real fetch
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      <Navbar />

      {/* Full-page loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 dark:bg-slate-900 z-50"
          >
            {/* Logo as React component */}
            <div className=" mb-4 justify-center align-center">
              <Logo />
            </div>

            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />

            <p className="mt-4 text-slate-700 dark:text-slate-300 font-medium">
              Loading...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      {!loading && <div className="flex-grow">{children}</div>}

      <Footer />
    </div>
  );
};

export default CommonLayout;
