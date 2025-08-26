import type { TGenericErrorResponse } from "@/types/error";
import { Link } from "react-router-dom";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const GlobalError = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center text-white px-6 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        <h1 className="text-4xl font-bold mb-4">Error {error.status}</h1>
        <p className="mb-4 text-lg">
          {error.statusText || "Something went wrong."}
        </p>
        <a
          href="/"
          className="px-6 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition"
        >
          Go to Home
        </a>
      </section>
    );
  }

  // Match your backend error structure
  const customError = error as TGenericErrorResponse;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-white px-6 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-4 text-lg">
        {customError?.message || "Unknown error occurred."}
      </p>

      {Array.isArray(customError?.errorSources) &&
        customError.errorSources.length > 0 && (
          <ul className="text-red-300 text-sm mb-4 space-y-1">
            {customError.errorSources.map((e, i) => (
              <li key={i}>
                <strong>{e.path}:</strong> {e.message}
              </li>
            ))}
          </ul>
        )}

      <Link
        to="/"
        className="px-6 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition"
      >
        Go to Home
      </Link>
    </section>
  );
};

export default GlobalError;
