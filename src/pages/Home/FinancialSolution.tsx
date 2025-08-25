import SendMoneyImage from "@/assets/images/send-money.jpg";
import WithdrawMoneyImage from "@/assets/images/withdraw-money.jpg";
import CashInImage from "@/assets/images/cash-in.jpg";
import { Link } from "react-router";

const FinancialSolution = () => {
  return (
    <>
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold">What You Can Do</h2>
          <p className="mt-4 text-base sm:text-lg text-white/80">
            Manage your finances with ease — from sending money to cash-in to
            withdraw!
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Send Money Instantly",
              text: "Transfer funds securely to anyone, anywhere, anytime!",
              img: `${SendMoneyImage}`,
              btn: "Learn More",
            },
            {
              title: "Withdraw Anytime",
              text: "Access Cash instantly at any nearby agent or bank!",
              img: `${WithdrawMoneyImage}`,
              btn: "Learn More",
            },
            {
              title: "Cash-In Easily",
              text: "Fund your e-wallet in seconds!",
              img: `${CashInImage}`,
              btn: "Learn More",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-gray-900 dark:border-gray-700"
            >
              <img
                src={card.img}
                alt={card.title}
                className="h-48 w-full object-cover"
              />
              <div className="flex-1 p-5 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {card.text}
                </p>
              </div>
              <div className="p-5 pt-0 text-center">
                <Link
                  to="/features"
                  className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700"
                >
                  {card.btn}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FinancialSolution;
