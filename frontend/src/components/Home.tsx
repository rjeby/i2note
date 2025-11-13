import { useAppSelector } from "../hooks";
import { selectIsNoteBeingCreated } from "../slices/homeSlice";
import HomeContent from "./HomeContent";
import HomeSidebar from "./HomeSidebar";

const Home = () => {
  const isNoteBeingCreated = useAppSelector(selectIsNoteBeingCreated);

  return (
    <div className="flex h-screen w-screen flex-1">
      {!isNoteBeingCreated && <HomeSidebar />}
      <HomeContent />
    </div>
  );
};

export default Home;
