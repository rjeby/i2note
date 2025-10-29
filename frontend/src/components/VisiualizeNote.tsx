import iconTag from "../assets/icon-tag.svg";
import iconClock from "../assets/icon-clock.svg";
import { useState } from "react";

const VisiualizeNote = () => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [content, setContent] = useState("");
  const [editedContent, setEditedContent] = useState("");
  return (
    <div className="col-span-1 flex flex-1 flex-col border-x border-x-gray-300 px-6 pt-4">
      <div className="flex flex-col gap-4 border-b border-b-gray-300 pb-8">
        <span className="text-2xl font-bold">
          React Performance Optimization
        </span>
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
            <span>29 Oct 2024</span>
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
        onChange={(event) => setEditedContent(event.target.value)}
      ></textarea>
      <div className="flex items-center gap-4 pt-6 pb-4">
        <button
          type="button"
          className="rounded-sm bg-blue-600 px-4 py-2 text-white"
          onClick={() => {
            if (isBeingEdited) {
              setContent(editedContent);
            }
            setIsBeingEdited(!isBeingEdited);
          }}
        >
          {isBeingEdited ? "Save Note" : "Edit Note"}
        </button>
        {isBeingEdited && (
          <button
            type="button"
            className="rounded-sm bg-gray-200 px-4 py-2 text-gray-500"
            onClick={() => {
              setEditedContent(content);
              setIsBeingEdited(!isBeingEdited);
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
