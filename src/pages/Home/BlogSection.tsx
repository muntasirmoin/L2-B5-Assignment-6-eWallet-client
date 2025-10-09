import { motion } from "framer-motion";

const digitalWalletNews = [
  {
    title: "Bangladesh Sees 50% Increase in Mobile Payments",
    image:
      "https://res.cloudinary.com/dta2gcxsl/image/upload/v1759998102/istockphoto-1403441615-612x612_pcvxqs.jpg",
    summary:
      "Mobile wallet adoption continues to surge in Bangladesh with more users shifting to QR-based payments and app-to-app transfers.",
    link: "#",
  },
  {
    title: "Security Tips for Your Digital Wallet",
    image:
      "https://res.cloudinary.com/dta2gcxsl/image/upload/v1759998386/security_aoea7t.jpg",
    summary:
      "Protect your funds with these essential tips, including two-factor authentication, app permissions, and monitoring transactions.",
    link: "#",
  },
  {
    title: "New Features in Mobile Wallet App",
    image:
      "https://res.cloudinary.com/dta2gcxsl/image/upload/v1759999002/mobile-wallet-solutions-e1429788444903_qmhstt.jpg",
    summary:
      "The latest update introduces instant transfer, bill payments, and AI-powered expense tracking.",
    link: "#",
  },
  {
    title: "Cashless Society Milestone Achieved",
    image:
      "https://res.cloudinary.com/dta2gcxsl/image/upload/v1759998600/360_F_209642121_hEkEZa9vMt1pn4uWohoNOcITa6dvheYE_rrowbx.jpg",
    summary:
      "Digital payments have now surpassed cash transactions in 10 major cities.",
    link: "#",
  },
  {
    title: "Top 5 Digital Wallets 2025",
    image:
      "https://res.cloudinary.com/dta2gcxsl/image/upload/v1759998765/istockphoto-510902675-612x612_brfpoy.jpg",
    summary:
      "A detailed comparison of the most popular digital wallets based on features, user base, and transaction volume.",
    link: "#",
  },
  {
    title: "Future of QR Payments in Bangladesh",
    image:
      "https://res.cloudinary.com/dta2gcxsl/image/upload/v1759998891/qr-code-scanning-vector-illustration-concept-pay-invoice-by-qr-code-with-mobile-phone-online-payment_320153-44_ubfzas.avif",
    summary:
      "QR payments are becoming a standard, enabling instant, secure, and cashless transactions nationwide.",
    link: "#",
  },
];

const BlogSection = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] transition-colors duration-500">
      {/* Section Header */}
      <div className="mx-auto text-center mb-16 max-w-4xl">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent dark:text-white"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          Digital Wallet Insights
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mt-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Stay ahead with the latest news, tips, and trends in mobile payments.
        </motion.p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {digitalWalletNews.map((news, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col justify-between h-full rounded-3xl overflow-hidden shadow-lg  group hover:scale-105 hover:shadow-2xl transition-transform duration-300 bg-white dark:bg-slate-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
          >
            {/* Image */}
            <div className="w-full h-36 md:h-40 xl:h-44 overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-fill transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <h3 className="text-sm md:text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 mb-2">
                {news.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4">
                {news.summary}
              </p>
              <a
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400 font-medium text-xs md:text-sm mt-auto"
              >
                Read more
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
