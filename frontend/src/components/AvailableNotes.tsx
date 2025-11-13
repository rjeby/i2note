import type { NoteInfoCardProps } from "../types";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { formateISO8601Date } from "../utils";
import { selectAvailableNotes, selectTagsByNoteId } from "../slices/dataSlice";

import {
  selectSelectedNoteId,
  selectSelectedNoteType,
  setIsNoteBeingCreated,
  setSelectedNoteId,
} from "../slices/homeSlice";

const AvailableNotes = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectAvailableNotes);
  const selectedNoteId = useAppSelector(selectSelectedNoteId);
  const selectedNoteType = useAppSelector(selectSelectedNoteType);
  return (
    <div
      className="flex flex-col items-start gap-4 overflow-scroll border-r border-r-gray-300 py-4 pr-4 pl-8"
      style={{
        flex: selectedNoteId !== -1 ? "0 1 auto" : "1",
      }}
    >
      {selectedNoteType === "all-notes" && (
        <button
          className="w-xs rounded-sm bg-blue-600 py-2 text-white"
          onClick={() => dispatch(setIsNoteBeingCreated(true))}
        >
          Create New Note
        </button>
      )}
      {notes.length !== 0 ? (
        <ul
          className="flex flex-col gap-4"
          style={{
            flexWrap: selectedNoteId !== -1 ? "nowrap" : "wrap",
            flexDirection: selectedNoteId !== -1 ? "column" : "row",
          }}
        >
          {notes.map((note) => (
            <NoteInfoCard key={note.id} note={note} />
          ))}
        </ul>
      ) : (
        <p className="flex flex-col gap-2 rounded-sm bg-gray-200 px-2 py-2">
          <span>{selectedNoteType === "all-notes" ? "No Notes yet." : "Nothing in the archive."}</span>
          <span className="text-sm font-bold italic">
            {selectedNoteType === "all-notes"
              ? "Start by creating your first one!"
              : "Archived notes will appear here!"}
          </span>
        </p>
      )}
    </div>
  );
};

const NoteInfoCard = ({ note }: NoteInfoCardProps) => {
  const dispatch = useAppDispatch();
  const selectedNoteId = useAppSelector(selectSelectedNoteId);
  const tags = useAppSelector(selectTagsByNoteId(note.id));
  const noteInfoCardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedNoteId === note.id && noteInfoCardRef.current) {
      noteInfoCardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [note.id, selectedNoteId]);

  return (
    <button
      className="flex w-xs flex-col gap-2 rounded-sm border border-gray-300 p-2 hover:scale-105"
      ref={noteInfoCardRef}
      style={{
        background: selectedNoteId === note.id ? "#e5e7eb" : "transparent",
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
