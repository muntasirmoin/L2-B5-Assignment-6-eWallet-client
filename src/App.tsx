import { Outlet } from "react-router-dom";
import CommonLayout from "./components/layout/CommonLayout";

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* <div className="w-[70%] mx-auto"> */}
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </div>
  );
}

export default App;
