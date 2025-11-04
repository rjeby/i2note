import logo from "../assets/favicon.svg";
import iconHome from "../assets/icon-home.svg";
import iconArchive from "../assets/icon-archive.svg";
import iconChevronRight from "../assets/icon-chevron-right.svg";
import iconTag from "../assets/icon-tag.svg";

import { useAppDispatch, useAppSelector } from "../hooks";
import { setSelectedNotesType, setSlectedTagId } from "../slices/homeSlice";
import type { ShowNotesProps, TagCardProps } from "../types";

const HomeSidebar = () => {
  const dispatch = useAppDispatch();
  const homeState = useAppSelector((state) => state.home);
  const notesSetIds = new Set(
    homeState.notes
      .filter((note) =>
        homeState.selectedNotesType === "all-notes"
          ? !note.isArchived
          : note.isArchived,
      )
      .map((note) => note.id),
  );
  const tagsSetIds = new Set(
    homeState.noteTagAssociations
      .filter((association) => notesSetIds.has(association.noteId))
      .map((association) => association.tagId),
  );
  const noteTags = homeState.noteTags.filter((tag) => tagsSetIds.has(tag.id));
  const hasTags = noteTags.length !== 0;
  return (
    <div className="flex w-xs flex-col border-r border-r-gray-300 px-4 py-8">
      <div className="flex flex-col">
        <div className="mb-6 flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="text-2xl font-medium">i2note</span>
        </div>
        <div className="flex flex-col gap-4 border-b border-b-gray-300 pb-4">
          <ShowNotes type={"all-notes"} />
          <ShowNotes type={"archived-notes"} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-scroll pt-2 pl-2">
        <span className="text-sm text-gray-500">Tags</span>
        {hasTags ? (
          <ul className="flex flex-1 flex-col gap-2 overflow-scroll pr-4">
            {noteTags.map((tag) => (
              <li
                key={tag.id}
                className="rounded-sm px-2 py-2 hover:scale-105"
                style={{
                  background:
                    homeState.selectedTagId === tag.id ? "#f3f4f6" : "",
                }}
                onClick={() => dispatch(setSlectedTagId(tag.id))}
              >
                <TagCard tag={tag.content} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex flex-col gap-2 rounded-sm bg-gray-200 px-2 py-2">
            <span>No Tags yet.</span>
            <span className="text-sm font-bold italic">
              Add tags to organize your notes!
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

const ShowNotes = ({ type }: ShowNotesProps) => {
  const selectedNotesType = useAppSelector(
    (state) => state.home.selectedNotesType,
  );
  const dispatch = useAppDispatch();
  const isNotesTypeSelected = selectedNotesType === type;

  return (
    <button
      type="button"
      className="flex items-center justify-between rounded-sm px-2 py-2 hover:bg-gray-100"
      style={{background: isNotesTypeSelected ? "#f3f4f6" : ""}}
      onClick={() => dispatch(setSelectedNotesType(type))}
    >
      <div className="flex items-center gap-4">
        <img
          src={type === "all-notes" ? iconHome : iconArchive}
          alt={type === "all-notes" ? "Home Icon" : "Archive Icon"}
        />
        <span>{type === "all-notes" ? "All Notes" : "Archived Notes"}</span>
      </div>
      {isNotesTypeSelected && (
        <img src={iconChevronRight} alt="Right Chevron Icon" />
      )}
    </button>
  );
};

const TagCard = ({ tag }: TagCardProps) => {
  return (
    <button className="flex items-center gap-2">
      <img src={iconTag} alt="Tag Icon" />
      <span className="text-md">{tag}</span>
    </button>
  );
};

export default HomeSidebar;
