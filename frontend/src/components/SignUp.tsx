import type { ResponseError, ResponseSuccess } from "@/types";
import { useAppDispatch } from "@/hooks";
import { addMessage } from "@/slices/toastSlice";
import { useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "./Spinner";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isRegisterRequestPending, setIsRegisterRequestPending] = useState(false);
  const _isEmailValid = isEmailValid(email);
  const _isPasswordValid = isPasswordValid(password);
  const _doesPasswordsMatch = doesPasswordsMatch(password, confirmPassword);
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await register(email, password);
  };

  const register = async (email: string, password: string) => {
    try {
      setIsRegisterRequestPending(() => true);
      const response = await fetch(`http://localhost:3000/api/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error((data as ResponseError).message);
      }
      setIsRegisterRequestPending(() => false);
      navigate("/sign-in");
      dispatch(addMessage({ content: (data as ResponseSuccess).message, type: "success" }));
    } catch (err) {
      setIsRegisterRequestPending(() => false);
      if (err instanceof Error) {
        dispatch(addMessage({ content: err.message, type: "error" }));
      }
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <form className="flex w-xl flex-col gap-4 rounded-xl bg-gray-100 px-8 py-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-md font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-sm bg-white py-1 pl-2"
          />
          {!_isEmailValid && <p className="rounded-sm bg-red-300 py-1 text-center font-medium">Invalid Email</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-md font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-sm bg-white py-1 pl-2"
          />
          {!_isPasswordValid && (
            <p className="rounded-sm bg-red-300 py-1 text-center font-medium">
              Password must be at least 8 characters and include a lowercase letter (a-z), an uppercase letter (A-Z), a
              number (0-9), and a special character (!@$%*?&).
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirm-password" className="text-md font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="rounded-sm bg-white py-1 pl-2"
          />
          {!_doesPasswordsMatch && (
            <p className="rounded-sm bg-red-300 py-1 text-center font-medium">Passwords doesn't Match</p>
          )}
        </div>
        <button
          type="submit"
          onClick={(event) => handleSubmit(event)}
          disabled={!_isEmailValid || !_isPasswordValid || !_doesPasswordsMatch || isRegisterRequestPending}
          className="mt-8 flex items-center gap-2 self-center rounded-md bg-black px-4 py-1 font-medium text-white disabled:opacity-25"
        >
          {isRegisterRequestPending && <Spinner />}
          Sign Up
        </button>
      </form>
    </div>
  );
};

const isEmailValid = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const isPasswordValid = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

const doesPasswordsMatch = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

export default SignUp;
