import { useUserInfoQuery } from "@/redux/features/User/user.api";

const PersonalInfo = () => {
  const { data: userInfo } = useUserInfoQuery(undefined);
  const user = userInfo?.data;
  // console.log("userInfo", userInfo);
  return (
    <>
      <div className="flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 w-full max-w-lg transition-all duration-300 hover:shadow-emerald-300">
          {/* Header */}
          <h2 className="text-2xl font-extrabold text-center text-emerald-600 dark:text-emerald-400 mb-6">
            Your Profile Details
          </h2>

          {/* User Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700 dark:text-gray-200">
            <div>
              <span className="font-bold">👤 Name:</span>
              <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                {user?.name}
              </p>
            </div>
            <div>
              <span className="font-bold">📧 Email:</span>
              <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                {user?.email || "Not provided"}
              </p>
            </div>
            <div>
              <span className="font-bold">📞 Phone:</span>
              <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                {user?.phone}
              </p>
            </div>
            <div>
              <span className="font-bold">🎭 Role:</span>
              <p className="font-semibold text-emerald-700 dark:text-emerald-300 capitalize">
                {user?.role}
              </p>
            </div>
            {user?.role === "agent" ? (
              <div>
                <span className="font-bold">🛡️ Agent Approved:</span>
                <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                  {user?.isAgentApproved ? "✅ Yes" : "❌ No"}
                </p>
              </div>
            ) : (
              <div>
                <span className="font-bold">🚫 Blocked:</span>
                <p className="font-semibold text-red-700 dark:text-red-300">
                  {user?.isBlocked ? "❌ Yes" : "✅ No"}
                </p>
              </div>
            )}

            <div>
              <span className="font-bold">📍 Address:</span>
              <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                {user?.address || "Not provided"}
              </p>
            </div>
            <div>
              <span className="font-bold">📅 Joined:</span>
              <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="font-bold">🕒 Last Updated:</span>
              <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                {new Date(user?.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
