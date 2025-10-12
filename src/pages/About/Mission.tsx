"use client";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

const Mission = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center
                 w-full  px-6 sm:px-10 lg:px-16 py-20
                 bg-gradient-to-br from-indigo-50 via-slate-100 to-indigo-100
                 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
                 transition-colors duration-700 overflow-hidden"
    >
      {/* Animated background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15, scale: 1.1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25),transparent_70%)] pointer-events-none"
      />

      <motion.div
        className="relative z-10 "
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.h3
          custom={0}
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold
                     bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600
                     bg-clip-text text-transparent drop-shadow-sm mb-6"
        >
          Our Mission
        </motion.h3>

        {/* Divider */}
        <motion.div
          custom={1}
          variants={fadeUp}
          className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8"
        />

        {/* Paragraph */}
        <motion.p
          custom={2}
          variants={fadeUp}
          className="text-base sm:text-lg md:text-xl text-justify
                     text-slate-700 dark:text-slate-300 font-medium tracking-wide
                     bg-white/60 dark:bg-slate-900/60 backdrop-blur-md
                     p-8 sm:p-12 rounded-3xl shadow-lg shadow-indigo-100/40 dark:shadow-slate-900/40"
        >
          At the heart of our mission lies a commitment to fostering a fully
          cashless economy where digital financial services are universally
          accessible, efficient, and secure. We strive to deliver innovative
          digital solutions that empower individuals and businesses across
          urban centers and remote areas alike.
          <br />
          <br />
          Recognizing the diverse financial needs of our communities, our
          platform is designed to provide seamless, real-time transactions
          that uphold the highest standards of security and compliance. We are
          dedicated to bridging the gap between traditional financial systems
          and the digital future by promoting financial inclusion and
          transparency.
          <br />
          <br />
          Our technology-driven approach enables fast, reliable access to a
          broad spectrum of financial services, including payments, transfers,
          and bill settlements, thereby simplifying everyday financial
          management for all users.
          <br />
          <br />
          Building trust is paramount to our operations, and we continuously
          invest in robust security measures and regulatory compliance to
          safeguard our users’ data and funds. By partnering with stakeholders
          across the financial ecosystem, we aim to create a sustainable and
          resilient digital economy that fosters economic growth and
          opportunity for everyone.
          <br />
          <br />
          Through our unwavering dedication to innovation, accessibility, and
          security, we envision a future where digital finance is not just a
          convenience, but a fundamental pillar of economic empowerment for
          every individual, regardless of their location or background.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Mission;
