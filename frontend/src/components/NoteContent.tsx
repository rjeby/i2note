import iconTag from "../assets/icon-tag.svg";
import iconClock from "../assets/icon-clock.svg";
import iconArchive from "../assets/icon-archive.svg";
import iconDelete from "../assets/icon-delete.svg";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  setTitle,
  setContent,
  setIsBeingEdited,
  setTag,
  addTag,
  removeTag,
  updateNote,
  setNoteIsArchived,
  deleteNote,
  cancelEditing,
} from "../slices/homeSlice";
import type { TagCardProps } from "../types";
import { formateISO8601Date } from "../utils";
const NoteContent = () => {
  const homeState = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();

  const note = homeState.notes.find(
    (note) => note.id === homeState.selectedNoteId,
  );

  return (
    <div className="flex flex-1 flex-col px-6 pt-4">
      <div className="flex flex-col gap-4 border-b border-b-gray-300 pb-8">
        <textarea
          name="title"
          id="title"
          disabled={!homeState.isBeingEdited}
          value={homeState.title}
          maxLength={70}
          placeholder="Title ..."
          onChange={(event) => dispatch(setTitle(event.target.value))}
          className="resize-none text-2xl font-bold focus:outline-none"
        />
        <div className="flex flex-col gap-3">
          {homeState.isBeingEdited && (
            <div className="flex items-center gap-4">
              <input
                type="text"
                name="tag"
                id="tag"
                value={homeState.tag}
                maxLength={20}
                placeholder="Tag ..."
                className="w-40 rounded-sm border border-gray-300 py-1 pl-1"
                onChange={(event) => dispatch(setTag(event.target.value))}
              />
              <button
                type="button"
                className="rounded-sm bg-blue-600 px-2 py-1 text-white"
                onClick={() => dispatch(addTag(homeState.tag))}
              >
                Add Tag
              </button>
              <button
                type="button"
                className="rounded-sm bg-red-600 px-2 py-1 text-white"
                onClick={() => dispatch(removeTag(homeState.tag))}
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
            {homeState.tags.length !== 0 ? (
              <ul className="flex max-h-20 max-w-md flex-wrap gap-2 overflow-scroll">
                {homeState.tags.map((tag) => (
                  <TagCard key={tag} tag={tag} />
                ))}
              </ul>
            ) : (
              <span>----------------</span>
            )}
          </div>
          {!homeState.isBeingEdited && (
            <div className="flex flex-row gap-4">
              <div className="flex w-40 items-center gap-2">
                <img src={iconClock} alt="Clock Icon" />
                <span>Last Edited</span>
              </div>
              <span>
                {note ? formateISO8601Date(note.editedAt) : "jj-mm-yyyy"}
              </span>
            </div>
          )}
        </div>
      </div>
      <textarea
        name="note"
        id="note"
        placeholder="Note ..."
        disabled={!homeState.isBeingEdited}
        value={homeState.content}
        className="flex-1 resize-none border-b border-b-gray-300 px-1 pt-6 focus:outline-none"
        onChange={(event) => dispatch(setContent(event.target.value))}
      />
      <div className="flex items-center justify-between pt-6 pb-4">
        <div className="flex gap-4">
          <button
            type="button"
            className="rounded-sm bg-blue-600 px-4 py-2 text-white"
            onClick={() => {
              if (!homeState.isBeingEdited) {
                dispatch(setIsBeingEdited(true));
                return;
              }
              dispatch(updateNote());
            }}
          >
            {homeState.isBeingEdited ? "Save Note" : "Edit Note"}
          </button>

          {homeState.isBeingEdited && (
            <button
              type="button"
              className="rounded-sm bg-gray-200 px-4 py-2 text-gray-500"
              onClick={() => dispatch(cancelEditing())}
            >
              Cancel
            </button>
          )}
        </div>

        {!homeState.isBeingEdited && (
          <div className="flex gap-4">
            <button
              type="button"
              className="flex items-center gap-2 rounded-sm border border-gray-300 px-2 py-2 hover:bg-gray-100"
              onClick={() => {
                if (note) {
                  dispatch(setNoteIsArchived(note && !note.isArchived));
                }
              }}
            >
              <img src={iconArchive} alt="Archive Icon" />
              <span>
                {note && note.isArchived ? "Unarchive Note" : "Archive Note"}
              </span>
            </button>
            {note && !note.isArchived && (
              <button
                type="button"
                className="flex items-center gap-2 rounded-sm border border-gray-300 px-2 py-2 hover:bg-gray-100"
                onClick={() => dispatch(deleteNote())}
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
