import { useState } from "react";

const ErrorLoading = ({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => Promise<void> | void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;
    setLoading(true);
    try {
      await onRetry();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-red-100 p-4 rounded shadow w-full mx-auto text-red-700 text-center">
      <p>{message || "Something went wrong."}</p>
      {onRetry && (
        <button
          onClick={handleRetry}
          disabled={loading}
          className={`mt-3 px-4 py-2 cursor-pointer rounded text-white transition ${
            loading
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Retrying..." : "Retry"}
        </button>
      )}
    </div>
  );
};

export default ErrorLoading;

//  {
//     data
//     isLoading
//     isError,
//     refetch,
//   }

// return (
//       <ErrorLoading
//         message="Failed to load!"
//         onRetry={() => {
//           void refetch();
//         }}
//       />
//     );
