import { useAppSelector } from "../hooks";
import { selectIsNoteBeingCreated, selectSelectedNoteId } from "../slices/homeSlice";
import AvailableNotes from "./AvailableNotes";
import NoteContent from "./NoteContent";

const HomeContentCore = () => {
  const isNoteBeingCreated = useAppSelector(selectIsNoteBeingCreated);
  const selectedNoteId = useAppSelector(selectSelectedNoteId);
  return (
    <div className="flex flex-1 overflow-scroll">
      {!isNoteBeingCreated && <AvailableNotes />}
      {(selectedNoteId !== -1 || isNoteBeingCreated) && <NoteContent />}
    </div>
  );
};

export default HomeContentCore;
