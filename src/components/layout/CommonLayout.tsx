import { type ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";
// import Logo from "@/assets/icons/Logo"; // SVG component

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 7;
      });
    }, 200);
    return () => clearInterval(timer);
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

            <div className="flex flex-col items-center justify-center">
              {/* Spinner with glow & gradient border */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Glowing background circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 blur-2xl opacity-50 animate-pulse"></div>

                {/* Rotating gradient ring */}
                <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 animate-spin-slow"></div>

                {/* Inner dot */}
                <div className="absolute w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
              </div>

              {/* Loading text with percentage */}
              <p className="mt-5 text-lg font-semibold text-slate-700 dark:text-slate-200 tracking-wide flex items-center gap-2">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                  E-Wallet Loading
                </span>
                <motion.span
                  key={progress}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-purple-500 dark:text-purple-400"
                >
                  {Math.floor(progress)}%
                </motion.span>
              </p>
            </div>

            {/*  */}
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
