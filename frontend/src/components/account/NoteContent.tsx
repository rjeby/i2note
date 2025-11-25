import type { TagCardProps } from "@/types";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { formateISO8601Date } from "@/utils";
import { addNote, deleteNote, selectSelectedNote, updateNote, archiveNote, unArchiveNote } from "@/slices/dataSlice";
import { selectIsNoteBeingCreated, setIsNoteBeingCreated } from "@/slices/homeSlice";
import { selectTagsForSelectedNote } from "@/slices/dataSlice";
import iconTag from "@/assets/icon-tag.svg";
import iconClock from "@/assets/icon-clock.svg";
import iconArchive from "@/assets/icon-archive.svg";
import iconDelete from "@/assets/icon-delete.svg";
import { selectToken } from "@/slices/authSlice";

const NoteContent = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(selectTagsForSelectedNote);
  const isNoteBeingCreated = useAppSelector(selectIsNoteBeingCreated);
  const note = useAppSelector(selectSelectedNote);
  const token = useAppSelector(selectToken) as string;
  const [isNoteBeingEdited, setIsNoteBeingEdited] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tempTags, setTempTags] = useState<string[]>([]);

  useEffect(() => {
    setTitle(note ? note.title : "");
    setContent(note ? note.content : "");
    setTempTags(note ? tags.map((value) => value.content) : []);
  }, [note, tags]);

  const handleAddTag = (tag: string) => {
    setTempTags((tg) => (tg.includes(tag) ? tg : [...tg, tag]));
    setTag(() => "");
  };

  const handleRemoveTag = (tag: string) => {
    setTempTags((tg) => tg.filter((value) => value !== tag));
    setTag(() => "");
  };

  const handleEditNote = () => {
    setIsNoteBeingEdited(() => true);
  };

  const handleCancelEdit = () => {
    if (isNoteBeingCreated) {
      dispatch(setIsNoteBeingCreated(false));
    }
    if (isNoteBeingEdited) {
      setIsNoteBeingEdited(() => false);
    }

    setTitle(() => (note ? note.title : ""));
    setContent(() => (note ? note.content : ""));
    setTag(() => "");
  };

  return (
    <div className="flex flex-1 flex-col px-6 pt-4">
      <div className="flex flex-col gap-4 border-b border-b-gray-300 pb-8">
        <textarea
          name="title"
          id="title"
          disabled={!isNoteBeingCreated && !isNoteBeingEdited}
          value={title}
          maxLength={70}
          placeholder="Title ..."
          onChange={(event) => setTitle(event.target.value)}
          className="resize-none text-2xl font-bold focus:outline-none"
        />
        <div className="flex flex-col gap-3">
          {(isNoteBeingEdited || isNoteBeingCreated) && (
            <div className="flex items-center gap-4">
              <input
                type="text"
                name="tag"
                id="tag"
                value={tag}
                maxLength={20}
                placeholder="Tag ..."
                className="w-40 rounded-sm border border-gray-300 py-1 pl-1"
                onChange={(event) => setTag(event.target.value)}
              />
              <button
                type="button"
                className="rounded-sm bg-blue-600 px-2 py-1 text-white"
                onClick={() => handleAddTag(tag)}
              >
                Add Tag
              </button>
              <button
                type="button"
                className="rounded-sm bg-red-600 px-2 py-1 text-white"
                onClick={() => handleRemoveTag(tag)}
              >
                Remove Tag
              </button>
            </div>
          )}
          <div className="flex flex-row items-start gap-4">
            <div className="flex w-40 items-center gap-2">
              <img src={iconTag} alt="Tag Icon" />
              <span>Tags</span>
            </div>
            {tempTags.length !== 0 ? (
              <ul className="flex max-h-20 max-w-md flex-wrap gap-2 overflow-scroll">
                {tempTags.map((tag) => (
                  <TagCard key={tag} tag={tag} />
                ))}
              </ul>
            ) : (
              <span>----------------</span>
            )}
          </div>
          {note && isNoteBeingEdited && (
            <div className="flex flex-row gap-4">
              <div className="flex w-40 items-center gap-2">
                <img src={iconClock} alt="Clock Icon" />
                <span>Last Edited</span>
              </div>
              <span>{formateISO8601Date(note.updatedAt)}</span>
            </div>
          )}
        </div>
      </div>
      <textarea
        name="note"
        id="note"
        placeholder="Note ..."
        disabled={!isNoteBeingCreated && !isNoteBeingEdited}
        value={content}
        className="flex-1 resize-none border-b border-b-gray-300 px-1 pt-6 focus:outline-none"
        onChange={(event) => setContent(event.target.value)}
      />
      <div className="flex items-center justify-between pt-6 pb-4">
        <div className="flex gap-4">
          <button
            type="button"
            className="rounded-sm bg-blue-600 px-4 py-2 text-white"
            onClick={() => {
              if (!isNoteBeingEdited && !isNoteBeingCreated) {
                handleEditNote();
                return;
              }
              const noteInfo = {
                title: title,
                content: content,
                tags: tempTags,
                token: token,
              };
              if (isNoteBeingCreated) {
                dispatch(addNote(noteInfo));
              }
              if (note && isNoteBeingEdited) {
                dispatch(updateNote({ id: note.id, ...noteInfo }));
              }
              handleCancelEdit();
            }}
          >
            {isNoteBeingEdited || isNoteBeingCreated ? "Save Note" : "Edit Note"}
          </button>

          {(isNoteBeingEdited || isNoteBeingCreated) && (
            <button type="button" className="rounded-sm bg-gray-200 px-4 py-2 text-gray-500" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </div>

        {note && !isNoteBeingEdited && (
          <div className="flex gap-4">
            <button
              type="button"
              className="flex items-center gap-2 rounded-sm border border-gray-300 px-2 py-2 hover:bg-gray-100"
              onClick={() => {
                if (!note.isArchived) {
                  dispatch(archiveNote({ id: note.id, token: token }));
                } else {
                  dispatch(unArchiveNote({ id: note.id, token: token }));
                }
              }}
            >
              <img src={iconArchive} alt="Archive Icon" />
              <span>{note.isArchived ? "Unarchive Note" : "Archive Note"}</span>
            </button>
            {!note.isArchived && (
              <button
                type="button"
                className="flex items-center gap-2 rounded-sm border border-gray-300 px-2 py-2 hover:bg-gray-100"
                onClick={() => dispatch(deleteNote({ id: note.id, token: token }))}
              >
                <img src={iconDelete} alt="Delete Icon" />
                <span>Delete Note</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const TagCard = ({ tag }: TagCardProps) => {
  return <span className="rounded-sm bg-gray-300 px-2 py-1">{tag}</span>;
};

export default NoteContent;
