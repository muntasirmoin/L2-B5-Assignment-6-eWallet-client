import SendMoneyImage from "@/assets/images/send-money.jpg";
import WithdrawMoneyImage from "@/assets/images/withdraw-money.jpg";
import CashInImage from "@/assets/images/cash-in.jpg";
import { Link } from "react-router-dom";

const FinancialSolution = () => {
  const cards = [
    {
      title: "Send Money Instantly",
      text: "Transfer funds securely to anyone, anywhere, anytime!",
      img: SendMoneyImage,
      btn: "Learn More",
    },
    {
      title: "Withdraw Anytime",
      text: "Access cash instantly at any nearby agent or bank!",
      img: WithdrawMoneyImage,
      btn: "Learn More",
    },
    {
      title: "Cash-In Easily",
      text: "Fund your e-wallet in seconds!",
      img: CashInImage,
      btn: "Learn More",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 mx-auto bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] transition-colors duration-500">
      {/* Header */}
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
          What You Can Do
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-white/70">
          Manage your finances with ease — from sending money to cash-in to
          withdraw!
        </p>
        <div className="h-1 w-20 mx-auto bg-indigo-500 rounded-full mt-5"></div>
      </div>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Image with overlay */}
            <div className="relative overflow-hidden">
              <img
                src={card.img}
                alt={card.title}
                className="h-52 w-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {card.text}
              </p>
            </div>

            {/* Button */}
            <div className="p-6 pt-0 text-center">
              <Link
                to="/features"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 
                text-sm font-medium text-white px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300 
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                {card.btn}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FinancialSolution;
