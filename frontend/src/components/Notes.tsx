import NodesSidebar from "../components/NotesSidebar";
import NotesActions from "./NotesActions";
import NotesHeader from "./NotesHeader";

const Notes = () => {
  return (
    <div className="flex flex-1 flex-col border border-black">
      <NotesHeader />
      <div className="flex">
        <NodesSidebar />
        <NotesActions />
      </div>
    </div>
  );
};

export default Notes;
