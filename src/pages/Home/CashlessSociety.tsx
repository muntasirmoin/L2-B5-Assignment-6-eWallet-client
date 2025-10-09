import { CheckCircle2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export interface IProject {
  title: string;
  subtitle?: string;
  thumbnail: string;
  features: string[];
  description: string;
  signup?: string;
}

const projectData: IProject[] = [
  {
    title: "Committed to Cashless Society",
    thumbnail:
      "https://res.cloudinary.com/dta2gcxsl/image/upload/v1759984793/pexels-fauxels-3184418_x9mzp6.jpg",
    features: [
      "QR-based payments nationwide",
      "Seamless mobile transactions",
      "Secure and interoperable platforms",
    ],
    description:
      "We are committed to transforming Bangladesh into a cashless society. We were the first to introduce QR code–based payments in the country and are continuously evolving to eliminate cash and build a connected digital ecosystem for everyone.",
    signup: "/register",
  },
];

const textVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const imageVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function CashlessSociety() {
  return (
    <section className="py-20 px-6 md:px-12 mx-auto bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500">
      {/* Section header */}
      <motion.div
        className="text-center mb-16 max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={textVariants}
      >
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-700 bg-clip-text text-transparent dark:text-white">
          Empowering a Cashless Future
        </h2>
        <p className="mt-3 text-lg text-slate-600 dark:text-white leading-relaxed">
          Pioneering the shift toward a fully digital financial ecosystem in
          Bangladesh.
        </p>
        <div className="h-1 w-24 mx-auto bg-blue-500 rounded-full mt-5"></div>
      </motion.div>

      {/* Project sections */}
      <div className="space-y-24">
        {projectData.map((project, idx) => (
          <div
            key={idx}
            className={`flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16`}
          >
            {/* Thumbnail */}
            <motion.div
              className="md:w-1/2 w-full relative rounded-3xl overflow-hidden shadow-2xl group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={imageVariants}
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-[340px] md:h-[400px] object-cover rounded-3xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            </motion.div>

            {/* Project details */}
            <motion.div
              className="md:w-1/2 w-full space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={textVariants}
            >
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white">
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-sm">
                  {project.title}
                </span>
              </h3>

              <p className="mt-3 text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed border-l-4 border-blue-600/50 pl-4 italic">
                {project.description}
              </p>

              {/* Features list */}
              <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                {project.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 bg-white/80 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 
                      rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div
                      className="flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 
                        text-white rounded-full w-6 h-6 shadow-sm flex-shrink-0"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-200 text-sm md:text-base font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="pt-6">
                <a
                  href={project.signup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-3 
                    bg-gradient-to-r from-blue-600 to-indigo-700 
                    hover:from-blue-700 hover:to-indigo-800 
                    text-white font-semibold rounded-xl text-base 
                    shadow-md hover:shadow-xl transition-all duration-300 
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  <UserPlus
                    size={20}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <span>Sign Up</span>
                </a>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
