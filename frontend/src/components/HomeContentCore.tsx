import { useAppSelector } from "../hooks";
import AvailableNotes from "./AvailableNotes";
import NoteContent from "./NoteContent";

const HomeContentCore = () => {
  const selectedNoteId = useAppSelector((state) => state.home.selectedNoteId);
  return (
    <div className="flex flex-1 overflow-scroll">
      <AvailableNotes />
      {selectedNoteId !== -1 && <NoteContent />}
    </div>
  );
};

export default HomeContentCore;
