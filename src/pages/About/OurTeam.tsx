"use client";

import { motion, type Variants } from "framer-motion";
import muntasirImage from "@/assets/teams/muntasir.jpg";
import fatemaImage from "@/assets/teams/fatema.png";
import rahimImage from "@/assets/teams/rahim.png";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

const teamMembers = [
  { name: "Muntasir", role: "Founder", img: muntasirImage },
  { name: "Fatema", role: "CEO", img: fatemaImage },
  { name: "Rahim", role: "Product Designer", img: rahimImage },
];

const OurTeam = () => {
  return (
    <section
      id="team"
      className="relative w-full min-h-screen py-24 px-6 sm:px-10 lg:px-16
                 bg-gradient-to-br from-indigo-50 via-slate-100 to-indigo-100
                 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
                 transition-colors duration-700 flex flex-col items-center overflow-hidden"
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.h3
          custom={0}
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold
                     bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600
                     bg-clip-text text-transparent drop-shadow-md mb-4"
        >
          Meet Our Team
        </motion.h3>
        <motion.p
          custom={1}
          variants={fadeUp}
          className="text-base sm:text-lg max-w-2xl mx-auto text-slate-700 dark:text-slate-300 font-medium tracking-wide"
        >
          Our talented team blends creativity and expertise to deliver seamless
          digital experiences with style and precision.
        </motion.p>
      </motion.div>

      {/* Team Members */}
      <div className="flex flex-wrap justify-center gap-20 md:gap-28">
        {teamMembers.map((member, i) => (
          <motion.div
            key={i}
            custom={i + 2}
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: i * 0.3, ease: "easeOut" }}
            viewport={{ once: false }}
            className="flex flex-col items-center relative"
          >
            {/* Glowing Circle Around Avatar */}
            <div
              className="absolute inset-0 w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52 
                         rounded-full bg-gradient-to-tr from-indigo-400 via-purple-400 to-blue-400
                         opacity-50 blur-3xl animate-pulse -z-10"
            />

            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 
                         rounded-full flex items-center justify-center 
                         hover:scale-110 transition-transform duration-500"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full rounded-full object-cover border-2 border-white/40 shadow-[0_0_25px_rgba(99,102,241,0.6)]"
              />
            </motion.div>

            {/* Name & Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.4 }}
              className="mt-5 text-center"
            >
              <h4 className="font-semibold text-lg sm:text-xl text-slate-700 dark:text-slate-300">
                {member.name}
              </h4>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                {member.role}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
