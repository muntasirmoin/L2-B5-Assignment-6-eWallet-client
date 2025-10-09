import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

const featuresData = [
  {
    label: "Send Money",
    img: "https://res.cloudinary.com/dta2gcxsl/image/upload/v1759992013/il_send_money_q04gdm.svg",
    description: "Instantly transfer funds",
    link: "/features",
  },
  {
    label: "Receive Money",
    img: "https://res.cloudinary.com/dta2gcxsl/image/upload/v1759992245/icon_download_app_108x108_vqo3rg.svg",
    description: "Securely collect payments",
    link: "/features",
  },
  {
    label: "Loyalty Rewards",
    img: "https://res.cloudinary.com/dta2gcxsl/image/upload/v1759992159/icon_star_exclusive_108x108_kml7hr.svg",
    description: "Get rewarded for usage",
    link: "/features",
  },
  {
    label: "Pay Online",
    img: "https://res.cloudinary.com/dta2gcxsl/image/upload/v1759991926/il_mobile_wallet_z4gqsv.svg",
    description: "Fast & secure checkout",
    link: "/features",
  },
];

// Framer Motion variants
const cardVariants: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      bounce: 0.3,
      duration: 0.8,
      delay: i * 0.2,
    },
  }),
};

export default function PaymentFeatures() {
  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] transition-colors duration-500">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent dark:text-white">
          Your Complete Payment Solution
        </h2>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mt-3">
          All you need to send, receive and pay online
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuresData.map((feature, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={cardVariants}
            className="flex flex-col items-center p-6 bg-gradient-to-br from-white/30 to-white/10 dark:from-gray-900/50 dark:to-gray-800/40 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 group"
          >
            {/* Image */}
            <div className="w-24 h-24 p-4 md:w-full md:h-48 mb-4 overflow-hidden rounded-xl shadow-md">
              <img
                src={feature.img}
                alt={feature.label}
                className="w-full h-full object-fill transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Label */}
            <h5 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              {feature.label}
            </h5>

            {/* Description */}
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 text-center mb-4">
              {feature.description}
            </p>

            {/* Learn More Button */}
            <Link
              to={feature.link}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-700 text-white rounded-lg font-medium text-sm hover:from-blue-600 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg"
            >
              Learn More
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
