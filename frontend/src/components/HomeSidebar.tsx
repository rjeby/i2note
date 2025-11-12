import type { ShowNotesProps, TagCardProps } from "../types";

import logo from "../assets/favicon.svg";
import iconHome from "../assets/icon-home.svg";
import iconArchive from "../assets/icon-archive.svg";
import iconChevronRight from "../assets/icon-chevron-right.svg";
import iconTag from "../assets/icon-tag.svg";

import type { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectTagsForFilteredNotesByArchivingStatus } from "../slices/dataSlice";
import { selectSelectedNoteType, selectSelectedTagId, setSelectedNoteType } from "../slices/homeSlice";
import { setSelectedTagId } from "../slices/homeSlice";

const HomeSidebar = () => {
  const dispatch = useAppDispatch();
  const selectedTagId = useAppSelector(selectSelectedTagId);
  const tags = useAppSelector((state: RootState) => selectTagsForFilteredNotesByArchivingStatus(state));
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
        {tags.length !== 0 ? (
          <ul className="flex flex-1 flex-col gap-2 overflow-scroll pr-4">
            {tags.map((tag) => (
              <li
                key={tag.id}
                className="rounded-sm px-2 py-2 hover:scale-105"
                style={{
                  background: selectedTagId === tag.id ? "#f3f4f6" : "",
                }}
                onClick={() => dispatch(setSelectedTagId(tag.id))}
              >
                <TagCard tag={tag.content} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex flex-col gap-2 rounded-sm bg-gray-200 px-2 py-2">
            <span>No Tags yet.</span>
            <span className="text-sm font-bold italic">Add tags to organize your notes!</span>
          </p>
        )}
      </div>
    </div>
  );
};

const ShowNotes = ({ type }: ShowNotesProps) => {
  const dispatch = useAppDispatch();
  const selectedNoteType = useAppSelector(selectSelectedNoteType);
  const isNoteTypeSelected = selectedNoteType === type;

  return (
    <button
      type="button"
      className="flex items-center justify-between rounded-sm px-2 py-2 hover:bg-gray-100"
      style={{ background: isNoteTypeSelected ? "#f3f4f6" : "" }}
      onClick={() => dispatch(setSelectedNoteType(type))}
    >
      <div className="flex items-center gap-4">
        <img
          src={type === "all-notes" ? iconHome : iconArchive}
          alt={type === "all-notes" ? "Home Icon" : "Archive Icon"}
        />
        <span>{type === "all-notes" ? "All Notes" : "Archived Notes"}</span>
      </div>
      {isNoteTypeSelected && <img src={iconChevronRight} alt="Right Chevron Icon" />}
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
