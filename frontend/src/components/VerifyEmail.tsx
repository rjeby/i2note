import type { RequestStatus, ResponseError } from "@/types";
import { useAppDispatch } from "@/hooks";
import { addMessage } from "@/slices/toastSlice";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const VerifyEmail = () => {
  const dispatch = useAppDispatch();
  const [verifyEmailRequestStatus, setVerifyEmailRequestStatus] = useState<RequestStatus>("idle");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const resolved = verifyEmailRequestStatus === "succeeded" || verifyEmailRequestStatus === "failed";
  const hasSucceeded = verifyEmailRequestStatus === "succeeded";

  useEffect(() => {
    let req = true;
    if (req) {
      const verify = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/verify-email?token=${token}`, {
            method: "GET",
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error((data as ResponseError).message);
          }
          dispatch(addMessage({ content: data.message, type: "success" }));
          setVerifyEmailRequestStatus("succeeded");
        } catch (err) {
          setVerifyEmailRequestStatus("failed");
          if (err instanceof Error) {
            dispatch(addMessage({ content: err.message, type: "error" }));
          }
        }
      };
      verify();
      return () => {
        req = false;
      };
    }
  }, [dispatch, token]);

  return (
    <>
      {resolved && (
        <div className="flex flex-1 items-center justify-center">
          <p className={`rounded-xl p-32 text-xl font-medium ${hasSucceeded ? "bg-green-400" : "bg-red-400"}`}>
            {hasSucceeded ? "Email Verified Successfully" : "Something went Wrong ..."}
          </p>
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
