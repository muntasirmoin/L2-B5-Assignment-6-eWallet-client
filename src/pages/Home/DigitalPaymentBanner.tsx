import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
// ✅ replace with your image

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, duration: 0.8 },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, delay: 0.3 },
  },
};

const DigitalPaymentBanner = () => {
  const { data } = useUserInfoQuery(undefined);

  return (
    <section
      className="relative flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-20 lg:py-32 overflow-hidden 
      bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] 
      transition-colors duration-500"
    >
      {/* Background subtle light effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/15 via-transparent to-transparent"></div>

      {/* Left Content */}
      <motion.div
        className="relative flex-1 text-center lg:text-left space-y-6 z-10"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent dark:text-white">
          Take Control of Your <br />
          <span className="text-indigo-600 dark:text-indigo-300">Finances</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-lg mx-auto lg:mx-0">
          Fast, secure, and effortless. Pay bills, transfer money, and manage
          your wallet anytime, anywhere.
        </p>

        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-6">
          {data?.data?.phone ? (
            <>
              {data.data.role === "user" && (
                <Link
                  to="/user/user-overview"
                  className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition"
                >
                  Go to User Dashboard
                </Link>
              )}
              {data.data.role === "agent" && (
                <Link
                  to="/agent/overview"
                  className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition"
                >
                  Go to Agent Dashboard
                </Link>
              )}
              {data.data.role === "admin" && (
                <Link
                  to="/admin/overview"
                  className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition"
                >
                  Go to Admin Dashboard
                </Link>
              )}
            </>
          ) : (
            <Link
              to="/register"
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
          )}

          <Link
            to="/features"
            className="border border-indigo-400 text-indigo-700 dark:text-indigo-300 px-6 py-3 rounded-md hover:bg-indigo-100 dark:hover:bg-white/10 transition"
          >
            Learn More
          </Link>
        </div>
      </motion.div>

      {/* Right Image with Framer Motion */}
      <motion.div
        className="relative flex-1 mb-10 lg:mb-0 flex justify-center z-10"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          src={"PaymentIllustration"}
          alt="Digital Payment Illustration"
          className="w-[85%] sm:w-[75%] lg:w-[70%] drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
};

export default DigitalPaymentBanner;
