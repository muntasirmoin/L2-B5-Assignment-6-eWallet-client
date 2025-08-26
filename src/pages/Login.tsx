import ImageLogin from "@/assets/images/image-login.jpg";
import { Link } from "react-router-dom";

import { LoginForm } from "@/components/modules/Authentication/LoginForm";
import Logo from "@/assets/icons/Logo";

export default function Login() {
  return (
    <>
      <div className="relative min-h-screen w-full bg-rose-300">
        {/* Background image */}
        <img
          src={ImageLogin}
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
          <div className="w-full max-w-md rounded-lg bg-white/90 dark:bg-black/60 p-8 shadow-lg backdrop-blur">
            <h2 className="mb-2 text-2xl font-bold text-center text-black dark:text-white">
              Log In
            </h2>

            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
