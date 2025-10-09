import BlogSection from "./BlogSection";
import BusinessWithUs from "./BussinessWithUs";
import CashlessSociety from "./CashlessSociety";
import DigitalPaymentBanner from "./DigitalPaymentBanner";

import FinancialStats from "./FinancialStats";
// import HeroBanner from "./HeroBanner";
import LocalGrowth from "./LocalGrowth";
import PaymentFeatures from "./PaymentFeatures";
import PayUtilityBills from "./PayUtilityBills";
import ReviewsSection from "./ReviewsSection";

const Home = () => {
  return (
    <>
      {/* <HeroBanner /> */}
      {/* <FinancialSolution /> */}
      <DigitalPaymentBanner />
      <PaymentFeatures />
      <BusinessWithUs />
      <CashlessSociety />
      <PayUtilityBills />
      <FinancialStats />

      <BlogSection />
      <ReviewsSection />
      <LocalGrowth />
    </>
  );
};

export default Home;
