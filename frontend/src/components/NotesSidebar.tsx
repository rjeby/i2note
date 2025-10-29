import { useAppDispatch, useAppSelector } from "../app/hooks";

const NoteInfoCard = ({ note }) => {
  return (
    <div className="flex flex-col gap-2 rounded-sm border border-gray-300 p-2">
      <span className="text-xl font-medium">{note.title}</span>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-sm bg-gray-300 px-2 py-1">Dev</span>
        <span className="rounded-sm bg-gray-300 px-2 py-1">React</span>
      </div>
      <span>{note.editedAt}</span>
    </div>
  );
};

const NotesSidebar = () => {
  const notes = useAppSelector((state) => state.notes);
  return (
    <div className="col-span-1 flex w-xs flex-col gap-4 overflow-scroll py-4 pr-4 pl-8">
      <button type="button" className="rounded-sm bg-blue-600 py-2 text-white">
        Create New Note
      </button>
      <ul className="flex flex-col gap-4">
        {notes.map((note) => (
          <NoteInfoCard key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default NotesSidebar;
