import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { MapPin, Users, UserCheck } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const growthData = [
  {
    label: "Cities Covered",
    value: 50,
    color: "text-blue-600 dark:text-blue-400",
    icon: (
      <MapPin className="w-10 h-10 md:w-12 md:h-12 text-blue-500 dark:text-blue-400 mb-2" />
    ),
  },
  {
    label: "Users",
    value: 1000000,
    color: "text-green-600 dark:text-green-400",
    icon: (
      <Users className="w-10 h-10 md:w-12 md:h-12 text-green-500 dark:text-green-400 mb-2" />
    ),
  },
  {
    label: "Agents",
    value: 120,
    color: "text-indigo-600 dark:text-indigo-400",
    icon: (
      <UserCheck className="w-10 h-10 md:w-12 md:h-12 text-indigo-500 dark:text-indigo-400 mb-2" />
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function LocalGrowth() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

  return (
    <section
      ref={ref}
      className="py-20 px-6 md:px-12 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] transition-colors duration-500"
    >
      <div className="mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left - Stats */}
        <motion.div
          className="flex-1 flex flex-col justify-center space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, duration: 0.8 }}
        >
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-2 
            bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent dark:text-white"
          >
            We’re Growing Locally
          </h2>
          <p className="text-lg md:text-lg text-slate-700 dark:text-slate-300 mb-8">
            Services are expanding across Bangladesh, connecting more people
            digitally every day.
          </p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {growthData.map((item, idx) => (
              <motion.div
                key={idx}
                className={`flex flex-col items-center rounded-3xl p-8
                  bg-gradient-to-br from-white/20 to-white/10 dark:from-gray-800/40 dark:to-gray-900/30
                  backdrop-blur-md shadow-xl hover:shadow-2xl hover:-translate-y-1
                  transition-all duration-500 border border-white/10`}
                variants={itemVariants}
              >
                {/* Icon */}
                <div className="p-1 rounded-full bg-white/10 dark:bg-gray-700/30 mb-4 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>

                {/* Count */}
                <p
                  className={`text-3xl md:text-4xl font-extrabold ${item.color}`}
                >
                  {inView ? (
                    <CountUp end={item.value} duration={2.5} separator="," />
                  ) : (
                    0
                  )}
                </p>

                {/* Label */}
                <p
                  className={`text-sm md:text-base font-semibold tracking-wider mt-2 text-center 
                  text-slate-600 dark:text-slate-300 uppercase
                  relative after:content-[''] after:block after:w-10 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-indigo-500 after:mx-auto after:mt-2`}
                >
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right - Map */}
        <motion.div
          className="flex-1 relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 w-full md:w-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, duration: 0.8 }}
        >
          <img
            src="https://res.cloudinary.com/dta2gcxsl/image/upload/v1759989023/Map-of-Bangladesh-showing-the-various-districts_src2ph.png"
            alt="Our local presence map"
            className="w-full h-[400px] md:h-[500px] object-fill rounded-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
        </motion.div>
      </div>
    </section>
  );
}
