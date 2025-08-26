import { useUserInfoQuery } from "@/redux/features/User/user.api";
import PersonalInfo from "../PersonalInfo";

import { UserUpdateProfileForm } from "@/components/modules/User/UserUpdateProfileForm";

const UserProfileUpdate = () => {
  const { data: userInfo } = useUserInfoQuery(undefined);

  console.log("userInfo", userInfo);
  return (
    <>
      <div className="min-h-[400px] sm:min-h-[500px] md:min-h-[500px] bg-gradient-to-r from-emerald-100 to-lime-200 px-4 py-5">
        {/* Personal Info Modal Card */}
        <PersonalInfo />

        {/* Responsive Transaction Table Below */}
        <div className="mt-10 px-2 sm:px-4 md:px-8 overflow-x-auto">
          <div className="min-w-[320px] w-full max-w-7xl mx-auto">
            {/* <MyRecentTransactionTable /> */}
            <UserUpdateProfileForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileUpdate;
