"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can I add money to my e-wallet?",
    answer:
      'You can add money via Bank, ATM card, Agent, or through physical agents. Go to the "Add Money" section, choose your source, and follow the steps.',
  },
  {
    question: "How do I send money to someone?",
    answer:
      'To send money, go to the "Send Money" option, enter the recipient’s mobile/account number, amount, and confirm the transaction.',
  },
  {
    question: "What is Cash In and how do I do it?",
    answer:
      "Cash In allows you to deposit physical cash into your mobile wallet via nearby agents. Share your number with the agent, hand over the cash, and confirm the transaction.",
  },
  {
    question: "How can I cash out money from my account?",
    answer:
      'To cash out, visit an agent or ATM that supports your wallet. Select "Cash Out" in the app, input the agent number or ATM code, and complete the process.',
  },
  {
    question: "What are the options to withdraw money?",
    answer:
      "You can withdraw money through agents, ATMs, or bank transfers. Choose your preferred withdrawal method in the e-wallet and follow the instructions.",
  },
  {
    question: "Is using the e-wallet safe and secure?",
    answer:
      "Yes, e-wallets are considered safe when used responsibly. To stay protected, never share your PIN or OTP with anyone.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <section
      className="relative px-6 py-5 md:px-10 md:py-5 
                 bg-gradient-to-br from-white via-gray-50 to-gray-100 
                 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] 
                 transition-colors duration-700 overflow-hidden"
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-400/20 dark:bg-blue-800/20 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-2 
                     bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 
                     bg-clip-text text-transparent drop-shadow-lg"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-gray-600 dark:text-gray-300 mb-4 
                     max-w-3xl mx-auto leading-relaxed"
        >
          Find quick answers to your most common questions about using your
          e-wallet securely and efficiently.
        </motion.p>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl shadow-lg 
                         bg-white/60 dark:bg-white/10 
                         backdrop-blur-md border border-gray-200 dark:border-gray-700 
                         hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] 
                         transition-all duration-500"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 sm:p-6 text-left"
              >
                <span
                  className="font-semibold text-lg sm:text-xl 
                                 text-gray-800 dark:text-gray-100"
                >
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2 text-indigo-500 dark:text-indigo-300"
                >
                  <ChevronDown size={22} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-5 sm:px-6 pb-5 sm:pb-6 
                               text-gray-700 dark:text-gray-300 
                               text-sm sm:text-base leading-relaxed border-t border-gray-200/60 dark:border-gray-700/50"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
