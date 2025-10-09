import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

export default function FinancialStats() {
  const [startCount, setStartCount] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false, // animate each time in view
  });

  useEffect(() => {
    if (inView) setStartCount(true);
  }, [inView]);

  const stats = [
    {
      title: "Total Send Money",
      value: 2450000,
      icon: <ArrowUpIcon className="w-14 h-14 text-green-500" />,
      gradient:
        "from-green-50 to-green-100 dark:from-green-800/40 dark:to-green-900/40",
    },
    {
      title: "Total Cash-In",
      value: 1750000,
      icon: <CurrencyDollarIcon className="w-14 h-14 text-blue-500" />,
      gradient:
        "from-blue-50 to-blue-100 dark:from-blue-800/40 dark:to-blue-900/40",
    },
    {
      title: "Total Cash-Out",
      value: 1420000,
      icon: <ArrowDownIcon className="w-14 h-14 text-red-500" />,
      gradient:
        "from-red-50 to-red-100 dark:from-red-800/40 dark:to-red-900/40",
    },
  ];

  // Framer Motion variants
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: 100 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", bounce: 0.3, duration: 0.8 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section
      ref={ref}
      className="py-20 px-6 md:px-12 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] transition-colors duration-500"
    >
      <div className="mx-auto text-center">
        <motion.div
          className="text-left mb-16 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={textVariants}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent dark:text-white mb-3">
            Our Financial Journey So Far
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-white/70 mt-3">
            A quick look at our growth and financial performance.
          </p>
          {/* <div className="h-1 w-24 mx-auto bg-blue-500 rounded-full mt-5"></div> */}
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className={`flex flex-col items-center justify-center rounded-3xl p-8
                bg-gradient-to-br ${stat.gradient} backdrop-blur-md
                shadow-xl hover:shadow-2xl hover:-translate-y-1
                transition-all duration-500 border border-white/10`}
            >
              <div className="p-6 rounded-full bg-white/10 mb-5 shadow-inner flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                {stat.icon}
              </div>

              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                {startCount ? (
                  <CountUp
                    end={stat.value}
                    redraw={true}
                    duration={2.5}
                    separator=","
                  />
                ) : (
                  0
                )}
              </h3>

              <p className="mt-3 text-sm md:text-base text-slate-700 dark:text-slate-300 font-semibold tracking-wide uppercase text-center relative after:content-[''] after:block after:w-10 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-indigo-500 after:mx-auto after:mt-2">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
