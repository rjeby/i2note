import HomeContentHeader from "./HomeContentHeader";
import HomeContentCore from "./HomeContentCore";
import { useAppSelector } from "../hooks";
import { selectIsNoteBeingCreated } from "../slices/homeSlice";

const HomeContent = () => {
  const isNoteBeingCreated = useAppSelector(selectIsNoteBeingCreated);
  return (
    <div className="flex flex-1 flex-col">
      {!isNoteBeingCreated && <HomeContentHeader />}
      <HomeContentCore />
    </div>
  );
};

export default HomeContent;
