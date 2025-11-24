import { useAppSelector } from "@/hooks";
import { selectIsNoteBeingCreated } from "@/slices/homeSlice";
import HomeContent from "@/components/account/AccountContent";
import HomeSidebar from "@/components/account/AccountSidebar";

const Account = () => {
  const isNoteBeingCreated = useAppSelector(selectIsNoteBeingCreated);

  return (
    <div className="flex h-screen w-screen flex-1">
      {!isNoteBeingCreated && <HomeSidebar />}
      <HomeContent />
    </div>
  );
};

export default Account;
