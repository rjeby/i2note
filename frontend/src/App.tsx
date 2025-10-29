import "./App.css";
import Notes from "./components/Notes";

function App() {
  // note: {id: number, content: text, created_at: date, edited_at: date}
  // tag: {id: number, content: text}
  // notesTags: {noteId: number, tagId: number}
  return (
    <>
      <Notes />
    </>
  );
}

export default App;
