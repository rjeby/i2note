import { useAppDispatch, useAppSelector } from "../hooks";
import { setSelectedNoteId } from "../slices/homeSlice";
import type { NoteInfoCardProps } from "../types";
import { formateISO8601Date } from "../utils";

const AvailableNotes = () => {
  const homeState = useAppSelector((state) => state.home);
  const notes = homeState.notes;
  const hasNotes = notes.length !== 0;
  return (
    <div className="flex w-xs flex-col gap-4 overflow-scroll border-r border-r-gray-300 py-4 pr-4 pl-8">
      <button type="button" className="rounded-sm bg-blue-600 py-2 text-white">
        Create New Note
      </button>
      {hasNotes ? (
        <ul className="flex flex-col gap-4">
          {notes.map((note) => (
            <NoteInfoCard key={note.id} note={note} />
          ))}
        </ul>
      ) : (
        <p className="flex flex-col gap-2 rounded-sm bg-gray-200 py-2 pl-2">
          <span>No Notes yet.</span>
          <span className="text-sm font-bold italic">
            Start by creating your first one!
          </span>
        </p>
      )}
    </div>
  );
};

const NoteInfoCard = ({ note }: NoteInfoCardProps) => {
  const homeState = useAppSelector((state) => state.home);
  const associatedTagIds = new Set(
    homeState.noteTagAssociations
      .filter((association) => association.noteId === note.id)
      .map((association) => association.tagId),
  );
  const tags = homeState.noteTags.filter((tag) => associatedTagIds.has(tag.id));
  const dispatch = useAppDispatch();

  return (
    <button
      className="flex flex-col gap-2 rounded-sm border border-gray-300 p-2 hover:scale-105"
      style={{
        background:
          homeState.selectedNoteId === note.id ? "#e5e7eb" : "transparent",
      }}
      onClick={() => dispatch(setSelectedNoteId(note.id))}
    >
      <span className="text-left text-xl font-medium">{note.title}</span>
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <span key={tag.id} className="rounded-sm bg-gray-300 px-2 py-1">
            {tag.content}
          </span>
        ))}
      </div>
      <span className="text-left">{formateISO8601Date(note.editedAt)}</span>
    </button>
  );
};
export default AvailableNotes;
