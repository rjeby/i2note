import { useAppSelector } from "../hooks";

const HomeContentHeader = () => {
  const selectedNotesType = useAppSelector(
    (state) => state.home.selectedNotesType,
  );
  return (
    <div className="flex items-center justify-between border-b border-b-gray-300 px-8 py-6">
      <span className="text-2xl font-bold">
        {selectedNotesType === "all-notes" ? "All Notes" : "Archived Notes"}
      </span>

      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search by title, content or tag ..."
        className="flex w-xs items-center gap-4 rounded-sm border border-gray-300 px-4 py-2 text-sm"
      />
    </div>
  );
};

export default HomeContentHeader;
