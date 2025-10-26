import logo from "../assets/favicon.svg";
import iconHome from "../assets/icon-home.svg";
import iconArchive from "../assets/icon-archive.svg";
import iconChevronRight from "../assets/icon-chevron-right.svg";
import Tag from "./Tag";
import { useState } from "react";

const Sidebar = () => {
  const [buttonsState, setButtonsState] = useState({
    isAllNotesButtonClicked: false,
    isArchivedNotesButtonCliked: false,
  });

  return (
    <div className="flex h-screen w-xs flex-col overflow-scroll border border-black px-4 py-8">
      <div className="mb-6 flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <span className="text-2xl">i2note</span>
      </div>
      <div className="flex flex-col gap-4 border-b border-b-gray-300 pb-4">
        <button
          type="button"
          className="flex items-center justify-between rounded-sm px-2 py-2 hover:bg-gray-100"
          style={{
            background: buttonsState.isAllNotesButtonClicked ? "#f3f4f6" : "",
          }}
          onClick={() =>
            setButtonsState({
              isAllNotesButtonClicked: true,
              isArchivedNotesButtonCliked: false,
            })
          }
        >
          <div className="flex items-center gap-4">
            <img src={iconHome} alt="Home Icon" />
            <span>All Notes</span>
          </div>
          {buttonsState.isAllNotesButtonClicked && (
            <img src={iconChevronRight} alt="Right Chevron Icon" />
          )}
        </button>
        <button
          type="button"
          className="flex items-center justify-between rounded-sm px-2 py-2 hover:bg-gray-100"
          style={{
            background: buttonsState.isArchivedNotesButtonCliked
              ? "#f3f4f6"
              : "",
          }}
          onClick={() =>
            setButtonsState({
              isAllNotesButtonClicked: false,
              isArchivedNotesButtonCliked: true,
            })
          }
        >
          <div className="flex items-center gap-4">
            <img src={iconArchive} alt="Home Icon" />
            <span>Archived Notes</span>
          </div>

          {buttonsState.isArchivedNotesButtonCliked && (
            <img src={iconChevronRight} alt="Right Chevron Icon" />
          )}
        </button>
      </div>
      <div className="flex flex-col gap-4 pt-2 pl-2">
        <span className="text-sm text-gray-500">Tags</span>
        <ul className="flex flex-col gap-2">
          {new Array(20).fill(0).map((_) => (
            <li className="rounded-sm px-2 py-2 hover:bg-gray-100">
              <Tag />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
