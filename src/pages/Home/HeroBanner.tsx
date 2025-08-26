import BannerImage from "@/assets/images/hero-banner1.jpg";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  const { data } = useUserInfoQuery(undefined);
  return (
    <>
      <section
        className="relative bg-cover bg-center bg-no-repeat lg:h-screen"
        style={{ backgroundImage: `url(${BannerImage})` }}
      >
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60"></div>{" "}
        {/* Optional overlay */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 text-white">
          <div className="max-w-2xl text-center lg:text-left">
            <h1 className="text-4xl font-extrabold sm:text-5xl sm:leading-tight">
              Take Control of Your
              <span className="text-indigo-400"> Finances </span>
            </h1>
            <div className="space-y-2 sm:space-y-3">
              <p className="text-lg sm:text-xl sm:leading-relaxed text-white/90">
                From sending money to withdrawing cash!
              </p>
              <p className="text-lg sm:text-xl sm:leading-relaxed text-white/90">
                — everything you need is in one secure app.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
              {/*  */}
              {data?.data?.phone ? (
                data.data.role === "user" ? (
                  <Link
                    to="/user/user-overview"
                    className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Go to User Dashboard
                  </Link>
                ) : data.data.role === "agent" ? (
                  <Link
                    to="/agent/overview"
                    className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Go to Agent Dashboard
                  </Link>
                ) : data.data.role === "admin" ? (
                  <Link
                    to="/admin/overview"
                    className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Go to Admin Dashboard
                  </Link>
                ) : (
                  // fallback if role unknown
                  <Link
                    to="/dashboard"
                    className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Go to Dashboard
                  </Link>
                )
              ) : (
                <Link
                  to="/register"
                  className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Get Started
                </Link>
              )}

              {/*  */}
              <Link
                to="/features"
                className="inline-block rounded-md border border-white/40 px-6 py-3 text-center text-sm font-medium text-white hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroBanner;
