import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router";
import { store } from "@/store.ts";
import NotFound from "@/components/NotFound.tsx";
import Home from "./components/Home";
import Account from "./components/account/Account";
import "@/index.css";
import App from "./App";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import VerifyEmail from "./components/VerifyEmail";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="account" element={<Account />} />
            <Route path="verify-email" element={<VerifyEmail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
