import iconArchive from "../assets/icon-archive.svg";
import iconDelete from "../assets/icon-delete.svg";

const NotesActions = () => {
  return (
    <div className="flex w-xs flex-col gap-4 border border-black pt-4 pr-8 pl-4">
      <button
        type="button"
        className="flex items-center gap-2 rounded-sm border border-gray-300 py-2 pl-4"
      >
        <img src={iconArchive} alt="Archive Icon" />
        <span>Archive Note</span>
      </button>
      <button
        type="button"
        className="flex items-center gap-2 rounded-sm border border-gray-300 py-2 pl-4"
      >
        <img src={iconDelete} alt="Delete Icon" />
        <span>Delete Icon</span>
      </button>
    </div>
  );
};

export default NotesActions;
