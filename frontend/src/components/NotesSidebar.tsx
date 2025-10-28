const NotesSidebar = () => {
  return (
    <div className="flex w-xs flex-col gap-4 border border-black py-4 pr-4 pl-8">
      <button type="button" className="rounded-sm bg-blue-600 py-2 text-white">
        Create New Note
      </button>
      <ul className="flex flex-col">
        <li>
          <div className="flex flex-col gap-2 rounded-sm border border-gray-300 p-2">
            <span className="text-xl font-medium">
              React Performance Optimization
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-sm bg-gray-300 px-2 py-1">Dev</span>
              <span className="rounded-sm bg-gray-300 px-2 py-1">React</span>
            </div>
            <span>29 Oct 2024</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NotesSidebar;
