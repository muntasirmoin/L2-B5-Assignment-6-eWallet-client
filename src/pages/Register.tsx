import Logo from "@/assets/icons/Logo";
import ImageRegister from "@/assets/images/image-register.jpg";
import RegisterForm from "@/components/modules/Authentication/RegisterForm";
import { Link } from "react-router";

const Register = () => {
  return (
    <>
      <div className="relative min-h-screen w-full bg-rose-300">
        {/* Background image */}
        <img
          src={ImageRegister} // Replace with actual path
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Optional dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Form Container */}
        <div className="relative z-10 flex flex-col items-center px-6 pt-20 md:pt-32">
          {/* Logo */}
          <Link
            to="/"
            className="mb-8 flex items-center gap-2 text-white text-xl font-semibold"
          >
            <Logo />
          </Link>

          {/* Form box */}
          <div className="w-full max-w-md rounded-lg bg-white/90 dark:bg-black/60 p-8 mb-5 shadow-lg backdrop-blur">
            <h2 className="mb-2 text-2xl font-bold text-center text-black dark:text-white">
              Sign In
            </h2>

            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
