import { useAppSelector } from "../hooks";
import AvailableNotes from "./AvailableNotes";
import NoteContent from "./NoteContent";

const HomeContentCore = () => {
  const homeState = useAppSelector((state) => state.home);
  return (
    <div className="flex flex-1 overflow-scroll">
      {!homeState.isNoteBeingCreated && <AvailableNotes />}
      {(homeState.selectedNoteId !== -1 || homeState.isNoteBeingCreated) && (
        <NoteContent />
      )}
    </div>
  );
};

export default HomeContentCore;
