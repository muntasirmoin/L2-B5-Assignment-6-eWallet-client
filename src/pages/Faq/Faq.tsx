const Faq = () => {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-900 via-indigo-950 to-indigo-900 text-white px-6 py-12 sm:px-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {/* Add Money */}
            <details className="bg-white/5 rounded-md p-4 group open:bg-white/10 transition">
              <summary className="cursor-pointer font-semibold text-lg flex justify-between items-center">
                How can I add money to my e-wallet?
                <span className="ml-2 transition-transform group-open:rotate-180">
                  &#9660;
                </span>
              </summary>
              <p className="mt-2 text-sm text-gray-200">
                You can add money via Bank, ATM card ,Agent, or through physical
                agents. Go to the "Add Money" section, choose your source, and
                follow the steps.
              </p>
            </details>

            {/* Send Money */}
            <details className="bg-white/5 rounded-md p-4 group open:bg-white/10 transition">
              <summary className="cursor-pointer font-semibold text-lg flex justify-between items-center">
                How do I send money to someone?
                <span className="ml-2 transition-transform group-open:rotate-180">
                  &#9660;
                </span>
              </summary>
              <p className="mt-2 text-sm text-gray-200">
                To send money, go to the "Send Money" option, enter the
                recipient’s mobile/account number, amount, and confirm the
                transaction.
              </p>
            </details>

            {/* Cash In */}
            <details className="bg-white/5 rounded-md p-4 group open:bg-white/10 transition">
              <summary className="cursor-pointer font-semibold text-lg flex justify-between items-center">
                What is Cash In and how do I do it?
                <span className="ml-2 transition-transform group-open:rotate-180">
                  &#9660;
                </span>
              </summary>
              <p className="mt-2 text-sm text-gray-200">
                Cash In allows you to deposit physical cash into your mobile
                wallet via nearby agents. Share your number with the agent, hand
                over the cash, and confirm the transaction.
              </p>
            </details>

            {/* Cash Out */}
            <details className="bg-white/5 rounded-md p-4 group open:bg-white/10 transition">
              <summary className="cursor-pointer font-semibold text-lg flex justify-between items-center">
                How can I cash out money from my account?
                <span className="ml-2 transition-transform group-open:rotate-180">
                  &#9660;
                </span>
              </summary>
              <p className="mt-2 text-sm text-gray-200">
                To cash out, visit an agent or ATM that supports your wallet.
                Select "Cash Out" in the app, input the agent number or ATM
                code, amount to complete.
              </p>
            </details>

            {/* Withdraw Money */}
            <details className="bg-white/5 rounded-md p-4 group open:bg-white/10 transition">
              <summary className="cursor-pointer font-semibold text-lg flex justify-between items-center">
                What are the options to withdraw money?
                <span className="ml-2 transition-transform group-open:rotate-180">
                  &#9660;
                </span>
              </summary>
              <p className="mt-2 text-sm text-gray-200">
                You can withdraw money through agents, ATMs, bank transfers.
                Choose your preferred withdrawal method in the e-wallet and
                follow.
              </p>
            </details>

            {/* E-Wallet Security */}
            <details className="bg-white/5 rounded-md p-4 group open:bg-white/10 transition">
              <summary className="cursor-pointer font-semibold text-lg flex justify-between items-center">
                Is using The e-wallet safe and secure?
                <span className="ml-2 transition-transform group-open:rotate-180">
                  &#9660;
                </span>
              </summary>
              <p className="mt-2 text-sm text-gray-200">
                Yes, e-wallets considered safe when used responsibly. To stay
                protected, never share your PIN or OTP with anyone.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
