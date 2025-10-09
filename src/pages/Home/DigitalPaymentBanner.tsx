import { motion, type Variants, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

const floatAnimation: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const DigitalPaymentBanner = () => {
  const { data } = useUserInfoQuery(undefined);

  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-150px" });

  // State to force remount corner images for scroll animation each time
  const [scrollKey, setScrollKey] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      // Force remount of corner images to animate again
      setScrollKey((prev) => prev + 1);
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const cornerImages = [
    {
      src: "https://res.cloudinary.com/dta2gcxsl/image/upload/v1760010840/0-2-1_ablhdu.jpg",
      pos: "top-[-60px] left-[-60px]",
      delay: 0.2,
      y: -15,
    },
    {
      src: "https://res.cloudinary.com/dta2gcxsl/image/upload/v1760010840/mobile-online-banking-concept_12892-62_qobeuh.avif",
      pos: "top-[-60px] right-[-60px]",
      delay: 0.4,
      y: 15,
    },
    {
      src: "https://res.cloudinary.com/dta2gcxsl/image/upload/v1760010839/r4M7jVRixOr8CTw3thm7bHge2RJCkP5se9KNjkNN_jxz0hc.jpg",
      pos: "bottom-[-60px] left-[-60px]",
      delay: 0.6,
      y: -20,
    },
    {
      src: "https://res.cloudinary.com/dta2gcxsl/image/upload/v1760012216/AdobeStock_383922452_hwdiar.jpg",
      pos: "bottom-[-60px] right-[-60px]",
      delay: 0.8,
      y: 20,
    },
  ];

  return (
    <section
      className="relative flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-20 lg:py-28 overflow-visible
      bg-gradient-to-br from-indigo-50 via-slate-100 to-indigo-100
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-700"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.15),_transparent_60%)]"></div>

      {/* Left Text */}
      <motion.div
        className="relative flex-1 text-center lg:text-left space-y-6 z-10"
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-2xl sm:text-4xl md:text-3xl lg:text-6xl font-extrabold leading-snug tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 bg-clip-text text-transparent drop-shadow-lg"
          custom={1}
          variants={textVariants}
        >
          Take Control of Your <br />
          <span className="relative text-indigo-600 dark:text-indigo-400 before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:bg-indigo-400 before:opacity-30 before:rounded-md before:animate-pulse">
            Finances
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-xl text-slate-700 dark:text-slate-300 max-w-lg mx-auto lg:mx-0 font-semibold leading-relaxed tracking-wide drop-shadow-sm"
          custom={2}
          variants={textVariants}
        >
          From sending money to withdrawing cash! <br />— Everything you need is
          in one secure app!
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-6"
          custom={3}
          variants={textVariants}
        >
          {data?.data?.phone ? (
            <>
              {data.data.role === "user" && (
                <Link
                  to="/user/user-overview"
                  className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-indigo-700 transition transform hover:scale-105"
                >
                  Go to User Dashboard
                </Link>
              )}
              {data.data.role === "agent" && (
                <Link
                  to="/agent/overview"
                  className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-indigo-700 transition transform hover:scale-105"
                >
                  Go to Agent Dashboard
                </Link>
              )}
              {data.data.role === "admin" && (
                <Link
                  to="/admin/overview"
                  className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-indigo-700 transition transform hover:scale-105"
                >
                  Go to Admin Dashboard
                </Link>
              )}
            </>
          ) : (
            <Link
              to="/register"
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-indigo-700 transition transform hover:scale-105"
            >
              Get Started
            </Link>
          )}

          <Link
            to="/features"
            className="border border-indigo-500 text-indigo-700 dark:text-indigo-300 px-6 py-3 rounded-md hover:bg-indigo-50 dark:hover:bg-white/10 transition hover:scale-105"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Image Cluster */}
      <motion.div
        className="relative flex-1 mb-10 lg:mb-0 flex justify-center z-10 mr-12"
        ref={ref}
      >
        {/* Main Image */}
        <motion.img
          src="https://res.cloudinary.com/dta2gcxsl/image/upload/v1760008479/istockphoto-870784968-612x612_sl0uu6.jpg"
          alt="Digital Payment Main"
          className="w-[80%] sm:w-[70%] lg:w-[65%] drop-shadow-[0_15px_35px_rgba(0,0,0,0.25)] rounded-xl relative z-20"
          variants={floatAnimation}
          animate="animate"
        />

        {/* Corner Images (animate from center each scroll) */}
        {cornerImages.map((img, index) => (
          <motion.img
            key={`${scrollKey}-${index}`} // force re-render each scroll
            src={img.src}
            alt={`corner ${index + 1}`}
            className={`absolute ${img.pos} w-28 sm:w-32 lg:w-36 rounded-lg shadow-md bg-white p-1`}
            initial={{ opacity: 0, scale: 0, x: "50%", y: "50%" }}
            animate={{
              opacity: inView ? 1 : 0,
              scale: inView ? 1 : 0,
              x: 0,
              y: img.y,
              transition: {
                duration: 0.8,
                delay: img.delay,
                ease: "easeOut",
              },
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default DigitalPaymentBanner;
