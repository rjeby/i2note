import { useAppSelector } from "@/hooks";
import { selectIsNoteBeingCreated } from "@/slices/homeSlice";
import HomeContentHeader from "@/components/account/AccountContentHeader";
import HomeContentCore from "@/components/account/AccountContentCore";

const AccountContent = () => {
  const isNoteBeingCreated = useAppSelector(selectIsNoteBeingCreated);
  return (
    <div className="flex flex-1 flex-col">
      {!isNoteBeingCreated && <HomeContentHeader />}
      <HomeContentCore />
    </div>
  );
};

export default AccountContent;
