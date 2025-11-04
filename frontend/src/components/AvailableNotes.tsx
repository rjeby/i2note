import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSelectedNoteId } from "../slices/homeSlice";
import type { NoteInfoCardProps } from "../types";
import { formateISO8601Date } from "../utils";

const AvailableNotes = () => {
  const homeState = useAppSelector((state) => state.home);
  const filterByTitle = homeState.filterByTitle.trim().toLowerCase();
  const notes = homeState.notes;
  const noteAssociatedToSelectedTagIds = new Set(
    homeState.noteTagAssociations
      .filter(
        (association) =>
          homeState.selectedTagId === -1 ||
          association.tagId === homeState.selectedTagId,
      )
      .map((association) => association.noteId),
  );

  const filtredNotes = notes.filter(
    (note) =>
      noteAssociatedToSelectedTagIds.has(note.id) &&
      (!homeState.filterByTitle ||
        (homeState.filterByTitle &&
          note.title.trim().toLowerCase().startsWith(filterByTitle))) &&
      ((homeState.selectedNotesType === "all-notes" && !note.isArchived) ||
        (homeState.selectedNotesType !== "all-notes" && note.isArchived)),
  );
  const hasNotes = filtredNotes.length !== 0;
  return (
    <div
      className="flex flex-col items-start gap-4 overflow-scroll border-r border-r-gray-300 py-4 pr-4 pl-8"
      style={{
        flex: homeState.selectedNoteId !== -1 ? "0 1 auto" : "1",
      }}
    >
      {homeState.selectedNotesType === "all-notes" && (
        <button className="w-xs rounded-sm bg-blue-600 py-2 text-white">
          Create New Note
        </button>
      )}
      {hasNotes ? (
        <ul
          className="flex flex-col gap-4"
          style={{
            flexWrap: homeState.selectedNoteId !== -1 ? "nowrap" : "wrap",
            flexDirection: homeState.selectedNoteId !== -1 ? "column" : "row",
          }}
        >
          {filtredNotes.map((note) => (
            <NoteInfoCard key={note.id} note={note} />
          ))}
        </ul>
      ) : (
        <p className="flex flex-col gap-2 rounded-sm bg-gray-200 px-2 py-2">
          <span>
            {homeState.selectedNotesType === "all-notes"
              ? "No Notes yet."
              : "Nothing in the archive."}
          </span>
          <span className="text-sm font-bold italic">
            {homeState.selectedNotesType === "all-notes"
              ? "Start by creating your first one!"
              : "Archived notes will appear here!"}
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

  const noteInfoCardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (homeState.selectedNoteId === note.id) {
      noteInfoCardRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [note.id, homeState.selectedNoteId]);

  return (
    <button
      className="flex w-xs flex-col gap-2 rounded-sm border border-gray-300 p-2 hover:scale-105"
      ref={noteInfoCardRef}
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
