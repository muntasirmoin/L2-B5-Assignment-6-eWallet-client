"use client";

import { motion } from "framer-motion";
import SendMoneyImage from "@/assets/images/send-money-f.jpg";
import SecureWalletImage from "@/assets/images/secure-wallet.jpg";
import CashInOutImage from "@/assets/images/cash-in-out-f.jpg";
import AddWithdrawImage from "@/assets/images/add-withdraw-f.jpg";
import TwentyFourImage from "@/assets/images/24-f.jpg";
import ReportImage from "@/assets/images/report-f.jpg";

const Features = () => {
  const features = [
    {
      title: "Send Money",
      desc: "Transfer funds instantly to anyone, anywhere — fast, reliable, and secure.",
      icon: SendMoneyImage,
    },
    {
      title: "Secure Wallet",
      desc: "Keep your funds protected with advanced encryption and real-time fraud detection.",
      icon: SecureWalletImage,
    },
    {
      title: "Cash-In & Cash-Out",
      desc: "Deposit or withdraw funds easily through authorized agents or partner banks.",
      icon: CashInOutImage,
    },
    {
      title: "Add & Withdraw Money",
      desc: "Quickly add balance or withdraw your money anytime with total transparency.",
      icon: AddWithdrawImage,
    },
    {
      title: "24/7 Access",
      desc: "Banking without limits — manage your wallet anytime, even on holidays.",
      icon: TwentyFourImage,
    },
    {
      title: "Insightful Reports",
      desc: "Track your spending with clean visual insights and intelligent reporting tools.",
      icon: ReportImage,
    },
    {
      title: "Bill Payments",
      desc: "Pay your bills directly from the wallet — electricity, water, internet, and more, with ease.",
      icon: "https://res.cloudinary.com/dta2gcxsl/image/upload/v1761140516/utilitybill_ptrv3r.avif",
    },
    {
      title: "QR Code Payments",
      desc: "Scan or generate QR codes for instant payments  hassle-free and secure.",
      icon: "https://res.cloudinary.com/dta2gcxsl/image/upload/v1761141635/qr-code-payment_nfvlvs.jpg",
    },
    {
      title: "Investment Options",
      desc: "Grow your funds by investing in safe, curated financial products directly from your wallet.",
      icon: "https://res.cloudinary.com/dta2gcxsl/image/upload/v1761141919/investment_wmx6tu.avif",
    },
  ];

  const motionVariants = [
    { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0 } },
    { hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0 } },
    { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
    { hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0 } },
    { hidden: { opacity: 0, rotate: -5 }, visible: { opacity: 1, rotate: 0 } },
    { hidden: { opacity: 0, y: -100 }, visible: { opacity: 1, y: 0 } },
  ];

  return (
    <section className="relative px-4 py-10 md:px-8 mx-auto bg-gradient-to-br from-white via-gray-100 to-gray-50 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] transition-colors duration-700">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
        className="text-center mb-16"
      >
        <h2
          className="text-4xl sm:text-5xl font-extrabold tracking-tight 
                       bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
                       bg-clip-text text-transparent drop-shadow-lg"
        >
          Explore Our Features
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Experience modern financial tools designed for simplicity, security,
          and total control.
        </p>
      </motion.div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            variants={motionVariants[i % motionVariants.length]}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
            viewport={{ once: false }}
            className="group relative flex flex-col overflow-hidden 
                       bg-white dark:bg-gray-900 rounded-2xl 
                       border border-gray-100 dark:border-gray-700 
                       shadow-lg hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] 
                       transition-all duration-500 ease-in-out"
          >
            {/* Full-width Image */}
            <div className="relative w-full h-48 overflow-hidden">
              <motion.img
                src={feature.icon}
                alt={feature.title}
                className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-110"
                whileInView={{
                  scale: [1.05, 1],
                  opacity: [0, 1],
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              {/* Subtle gradient overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col justify-between text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-wide">
                {feature.title}
              </h3>

              {/* Partition Bar */}
              <div className="mx-auto mb-3 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />

              <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
