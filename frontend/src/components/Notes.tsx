import { useState } from "react";
import NodesSidebar from "../components/NotesSidebar";
import NotesActions from "./NotesActions";
import NotesHeader from "./NotesHeader";
import VisiualizeNote from "./VisiualizeNote";

const Notes = () => {
  return (
    <div className="grid h-screen flex-1 grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr]">
      <NotesHeader />
      <NodesSidebar />
      <VisiualizeNote />
      <NotesActions />
    </div>
  );
};

export default Notes;
