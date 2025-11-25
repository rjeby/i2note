import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectIsNoteBeingCreated } from "@/slices/homeSlice";
import { useEffect } from "react";
import HomeContent from "@/components/account/AccountContent";
import HomeSidebar from "@/components/account/AccountSidebar";
import { getUserNotes } from "@/slices/dataSlice";
import { selectToken } from "@/slices/authSlice";

const Account = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const isNoteBeingCreated = useAppSelector(selectIsNoteBeingCreated);

  useEffect(() => {
    if (token) {
      dispatch(getUserNotes(token));
    }
  }, [token, dispatch]);

  return (
    <div className="flex h-screen w-screen flex-1">
      {!isNoteBeingCreated && <HomeSidebar />}
      <HomeContent />
    </div>
  );
};

export default Account;
