import { motion, type Variants } from "framer-motion";

const utilityImages = [
  "https://res.cloudinary.com/dta2gcxsl/image/upload/v1760001254/istockphoto-1333214263-612x612_gu00ae.jpg",
  "https://res.cloudinary.com/dta2gcxsl/image/upload/v1760001346/istockphoto-1463794661-612x612_ilyfxb.jpg",
  "https://res.cloudinary.com/dta2gcxsl/image/upload/v1760001581/dish-tv-consumer-products_t5lgp1.png",
  "https://res.cloudinary.com/dta2gcxsl/image/upload/v1760001582/unnamed_eswq7x.png",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120 },
  },
};

export default function PayUtilityBills() {
  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left - Image Grid */}
        <motion.div
          className="grid grid-cols-2 gap-4 md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
        >
          {utilityImages.map((img, idx) => (
            <motion.img
              key={idx}
              src={img}
              alt={`Utility ${idx + 1}`}
              className="w-full h-48 md:h-56 object-fill rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            />
          ))}
        </motion.div>

        {/* Right - Text Content */}
        <motion.div
          className="md:w-1/2 flex flex-col justify-center space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 100, duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent dark:text-white">
            Pay Your Utility Bills
          </h2>
          <p className="text-lg md:text-lg text-slate-700 dark:text-slate-300">
            Manage all your essential bills in one place. Electricity, water,
            internet, gas — pay securely and instantly using our digital wallet.
          </p>
          <a
            href="/features"
            className=" w-1/3 text-center inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}
