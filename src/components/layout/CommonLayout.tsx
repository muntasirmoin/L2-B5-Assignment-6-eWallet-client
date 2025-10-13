import { type ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";
// import Logo from "@/assets/icons/Logo"; // SVG component

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
            {/* <div className=" mb-4 justify-center align-center">
              <Logo />
            </div> */}
            <div className="flex justify-center mb-8">
              <motion.img
                src="https://res.cloudinary.com/dta2gcxsl/image/upload/v1760332205/output-onlinepngtools_iis7wf.png"
                alt="E-Wallet Logo"
                className="w-36 sm:w-44 md:w-52 h-auto drop-shadow-lg dark:drop-shadow-[0_0_25px_rgba(99,102,241,0.3)] 
               transition-transform duration-700 hover:scale-105"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
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
