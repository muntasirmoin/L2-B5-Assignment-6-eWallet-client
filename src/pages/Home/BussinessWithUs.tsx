import { CheckCircle2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useUserInfoQuery } from "@/redux/features/User/user.api";

export interface IProject {
  title: string;
  subtitle: string;
  thumbnail: string;
  features: string[];
  description: string;
  signup?: string;
}

const projectData: IProject[] = [
  {
    title: "Manage your business seamlessly!",
    subtitle: "Full-Stack MERN Application",
    thumbnail:
      "https://www.ipay.com.bd/wp-content/uploads/2023/04/shoppingBanner.c734683d-768x432-1.jpg",
    features: ["Online Payments", "In-Store Payments", "B2B Payments"],
    description:
      "Provides a secure one-stop payment solution for your business, connecting you with a user base of more than a million customers.",
    signup: "/register",
  },
];

const imageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const textVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

export default function BusinessWithUs() {
  const { data } = useUserInfoQuery(undefined);
  return (
    <section className="py-16 px-4 md:px-8 mx-auto bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] transition-colors duration-500">
      {/* Header */}
      <motion.div
        className="text-center mb-16 max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={textVariants}
      >
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent dark:text-white">
            Grow Your Business With Us
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-white/70">
            Need a reliable business payment solution?
          </p>
          <div className="h-1 w-20 mx-auto bg-blue-500 rounded-full mt-5"></div>
        </div>
      </motion.div>
      {/* Projects */}
      <div className="space-y-20">
        {projectData.map((project, idx) => (
          <div
            key={idx}
            className={`flex flex-col md:flex-row items-center gap-10`}
          >
            {/* Thumbnail */}
            <motion.div
              className="md:w-1/2 w-full relative rounded-2xl overflow-hidden shadow-lg group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={imageVariants}
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-[300px] object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            </motion.div>

            {/* Project details */}
            <motion.div
              className="md:w-1/2 w-full space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={textVariants}
            >
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                {project.title}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                {project.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mt-3">
                {project.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start text-slate-700 dark:text-gray-200 text-sm md:text-base leading-relaxed hover:text-blue-600 dark:hover:text-white transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="pt-4">
                <a
                  href={project.signup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  <UserPlus
                    size={18}
                    className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                  />
                  {data?.data?.phone ? (
                    <span className="tracking-wide">Sign Up</span>
                  ) : (
                    <span className="tracking-wide">Learn More</span>
                  )}
                </a>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
