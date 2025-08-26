import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl text-center text-red-600 font-bold mb-6">
          Unauthorized Access
        </h1>
        <p className="text-lg mb-10 max-w-xl text-center">
          Sorry, you do not have permission to view this page.
        </p>
        <button
          onClick={handleGoHome}
          className="px-8 py-3 cursor-pointer bg-green-600 hover:bg-green-700 rounded-md font-semibold transition"
        >
          Go to Home
        </button>
      </section>
    </>
  );
};

export default Unauthorized;
