import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectFilterByTitle, selectSelectedNoteType, setFilterByTitle } from "@/slices/homeSlice";
import iconSearch from "@/assets/icon-search.svg";

const HomeContentHeader = () => {
  const dispatch = useAppDispatch();
  const selecteNoteType = useAppSelector(selectSelectedNoteType);
  const filterByTitle = useAppSelector(selectFilterByTitle);

  return (
    <div className="flex items-center justify-between border-b border-b-gray-300 px-8 py-6">
      <span className="text-2xl font-bold">{selecteNoteType === "all-notes" ? "All Notes" : "Archived Notes"}</span>

      <div className="flex rounded-sm border-2 border-gray-300">
        <img src={iconSearch} alt="Search Icon" className="pr-2 pl-2" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search by title ..."
          value={filterByTitle}
          className="border-gray-black flex w-xs items-center gap-4 border-l border-gray-300 px-4 py-2 text-sm"
          onChange={(event) => dispatch(setFilterByTitle(event.target.value))}
        />
      </div>
    </div>
  );
};

export default HomeContentHeader;
