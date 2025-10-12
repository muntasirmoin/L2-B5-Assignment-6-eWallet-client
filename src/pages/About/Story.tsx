
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
  }),
};

const Story = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center
                 w-full h-screen px-6 sm:px-10 lg:px-16
                 bg-gradient-to-br from-indigo-50 via-slate-100 to-indigo-100
                 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
                 transition-colors duration-700 overflow-hidden"
    >
      {/* Animated Gradient Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15, scale: 1.1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25),transparent_70%)] pointer-events-none"
      />

      {/* Floating Gradient Circle */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-300 via-purple-300 to-blue-300 opacity-30 blur-3xl"
      />

      {/* Text Container */}
      <motion.div
        className="relative z-10 max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.h2
          custom={0}
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold
                     bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600
                     bg-clip-text text-transparent drop-shadow-sm mb-6"
        >
          The e-Wallet Story
        </motion.h2>

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
          className="text-base sm:text-lg md:text-xl leading-relaxed text-justify
                     text-slate-700 dark:text-slate-300 font-medium tracking-wide
                     bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-8 sm:p-12 
                     rounded-3xl shadow-lg shadow-indigo-100/40 dark:shadow-slate-900/40"
        >
          In today’s fast-paced world, financial transactions need to be simple,
          secure, and accessible to everyone. Our e-wallet app was born from
          this vision — to create a digital platform that empowers users across
          the country to send, receive, and manage money effortlessly, no matter
          where they are.
          <br />
          <br />
          We recognized the challenges many face in accessing traditional
          banking services, especially in rural and underserved communities. By
          leveraging cutting-edge technology, we designed an intuitive,
          user-friendly app that ensures every transaction is fast, safe, and
          transparent.
          <br />
          <br />
          Security and trust are at the core of everything we do — from
          encryption protocols to seamless user experience. We aim to bridge the
          financial divide by bringing reliable digital payment solutions to
          everyone.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Story;
