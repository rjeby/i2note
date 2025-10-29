import iconTag from "../assets/icon-tag.svg";
import iconClock from "../assets/icon-clock.svg";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  updateContent,
  updateEditedContent,
  updateIsBeignEdited,
  updateNoteById,
} from "../app/features/notes/notesSlice";

const VisiualizeNote = () => {
  const notes = useAppSelector((state) => state.notes.notes);
  const content = useAppSelector((state) => state.notes.content);
  const editedContent = useAppSelector((state) => state.notes.editedContent);
  const selectedNoteId = useAppSelector((state) => state.notes.selectedNoteId);
  const isBeingEdited = useAppSelector((state) => state.notes.isBeingEdited);
  const dispatch = useAppDispatch();

  const getNoteById = (id: number) => {
    const note = notes.find((note) => note.id === id);
    const defaultNote = {
      id: 1,
      title: "Meeting with Client",
      content: "Discuss project requirements and finalize milestones.",
      createdAt: "2025-09-12T10:15:00Z",
      editedAt: "2025-09-12T10:45:00Z",
    };
    return note === undefined ? defaultNote : note;
  };

  const selectedNote = getNoteById(selectedNoteId);

  return (
    <div className="col-span-1 flex flex-1 flex-col border-x border-x-gray-300 px-6 pt-4">
      <div className="flex flex-col gap-4 border-b border-b-gray-300 pb-8">
        <span className="text-2xl font-bold">{selectedNote.title}</span>
        <div className="flex items-center gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img src={iconTag} alt="Tag Icon" />
              <span>Tags</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={iconClock} alt="Clock Icon" />
              <span>Last Edited</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span>Dev, React</span>
            <span>{selectedNote.editedAt}</span>
          </div>
        </div>
      </div>
      <textarea
        name="note"
        id="note"
        placeholder="Note ..."
        disabled={!isBeingEdited}
        value={editedContent}
        className="flex-1 resize-none border-b border-b-gray-300 px-1 pt-6 focus:outline-none"
        onChange={(event) => dispatch(updateEditedContent(event.target.value))}
      ></textarea>
      <div className="flex items-center gap-4 pt-6 pb-4">
        <button
          type="button"
          className="rounded-sm bg-blue-600 px-4 py-2 text-white"
          onClick={() => {
            if (isBeingEdited) {
              dispatch(updateContent(editedContent));
              dispatch(
                updateNoteById({ id: selectedNoteId, content: editedContent }),
              );
            }
            dispatch(updateIsBeignEdited(!isBeingEdited));
          }}
        >
          {isBeingEdited ? "Save Note" : "Edit Note"}
        </button>
        {isBeingEdited && (
          <button
            type="button"
            className="rounded-sm bg-gray-200 px-4 py-2 text-gray-500"
            onClick={() => {
              dispatch(updateEditedContent(content));
              dispatch(updateIsBeignEdited(!isBeingEdited));
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default VisiualizeNote;
