import { Outlet } from "react-router";
import Toast from "./components/Toast";
import "@/App.css";

function App() {
  return (
    <>
      <Outlet />
      <Toast />
    </>
  );
}

export default App;
