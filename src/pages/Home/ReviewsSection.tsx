import { useInView } from "react-intersection-observer";
import { motion, type Variants } from "framer-motion";
import { Star } from "lucide-react";

const reviewsData = [
  {
    name: "Aminul Islam",
    role: "Small Business Owner",
    avatar: "https://i.pravatar.cc/150?img=32",
    review:
      "This platform has completely transformed the way I manage payments. Fast, secure, and reliable!",
    rating: 5,
  },
  {
    name: "Sadia Rahman",
    role: "Freelancer",
    avatar: "https://i.pravatar.cc/150?img=45",
    review:
      "I love how seamless the transactions are. The dashboard is intuitive and easy to use.",
    rating: 4,
  },
  {
    name: "Fahim Chowdhury",
    role: "Entrepreneur",
    avatar: "https://i.pravatar.cc/150?img=12",
    review:
      "Highly recommended! The support is excellent and the services are top-notch.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Shop Owner",
    avatar: "https://i.pravatar.cc/150?img=22",
    review:
      "Efficient, user-friendly, and trustworthy. My business operations are smoother now.",
    rating: 5,
  },
  {
    name: "Rashed Khan",
    role: "Startup Founder",
    avatar: "https://i.pravatar.cc/150?img=18",
    review:
      "The platform helps me track my transactions in real-time. Truly a game changer!",
    rating: 4,
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 },
  },
};

export default function ReviewsSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });
  // Framer Motion variants for the header
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, duration: 0.8 },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 px-6 md:px-12 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.div
          ref={ref}
          className="max-w-7xl mx-auto text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent dark:text-white">
            What Our Users Say
          </h2>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mt-3">
            Real feedback from businesses and individuals using our services.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      >
        {reviewsData.map((review, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            className="flex flex-col items-center p-6 rounded-3xl bg-white/30 dark:bg-gray-900/40 backdrop-blur-md shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-white/10"
          >
            {/* Avatar */}
            <img
              src={review.avatar}
              alt={review.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mb-4 shadow-inner"
            />

            {/* Name & Role */}
            <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
              {review.name}
            </h3>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-300 mb-4">
              {review.role}
            </p>

            {/* Review text */}
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 text-center mb-4">
              "{review.review}"
            </p>

            {/* Rating */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
