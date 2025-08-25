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
      desc: "Transfer funds instantly to anyone, anywhere with a few simple taps!",
      icon: `${SendMoneyImage}`,
    },
    {
      title: "Secure Wallet",
      desc: "Your money is stored securely with encryption and real-time fraud protection.",
      icon: `${SecureWalletImage}`,
    },
    {
      title: "Cash-In & Cash-Out",
      desc: "Easily deposit or withdraw money from agents or bank's.",
      icon: `${CashInOutImage}`,
    },
    {
      title: "Add & Withdraw Money",
      desc: "Easily deposit or withdraw cash through agents, bank's securely & without hassle.",
      icon: `${AddWithdrawImage}`,
    },
    {
      title: "24/7 Access",
      desc: "Manage your finances anytime, anywhere — even on holidays.",
      icon: `${TwentyFourImage}`,
    },
    {
      title: "Insightful Reports",
      desc: "Monitor your spending habits with intuitive charts and real-time financial insights.",
      icon: `${ReportImage}`,
    },
  ];

  return (
    <section className="px-4 py-16 md:px-8 max-w-7xl mx-auto text-gray-800 dark:text-gray-100 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold sm:text-4xl text-white">
          Explore Our Features
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-300">
          Everything you need to manage your money safely & maintain full
          control — all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="
      flex flex-col overflow-hidden rounded-xl
      bg-white dark:bg-gray-900 
      border border-transparent dark:border-gray-700
      shadow-lg hover:shadow-2xl hover:scale-[1.03]
      transition-transform duration-300 ease-in-out
    "
          >
            {/* Top image */}
            <img
              src={feature.icon}
              alt={`${feature.title} Image`}
              className="h-48 w-full object-cover"
            />

            {/* Text content */}
            <div className="p-6 text-center flex-1 flex flex-col justify-between">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
