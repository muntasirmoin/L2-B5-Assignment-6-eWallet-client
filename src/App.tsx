import { Outlet } from "react-router-dom";
import CommonLayout from "./components/layout/CommonLayout";
import GuidedTour from "./utils/GuidedTour";

function App() {
  return (
    <div className="w-full mx-auto">
    {/* // <div className="max-w-7xl mx-auto"> */}
      {/* <div className="w-[70%] mx-auto"> */}
      
      <GuidedTour />
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </div>
  );
}

export default App;
